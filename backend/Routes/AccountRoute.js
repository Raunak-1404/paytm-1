const express = require('express');
const mongoose = require('mongoose');
const AccountTable = require('../DB/Schema/BankSchema');
const authMiddleware = require('../Middlewares/auth');

const router = express.Router();

router.get('/balance', async(req,res)=> {
    const account = await AccountTable.findOne({userID: req.body.userID })
    console.log("Account id : " + req.body.userID);
    res.json({
        balance: account.balance
    });
});

router.post('/transfer', authMiddleware ,async (req, res) => {
    const { from, to, money } = req.body;

    try {
        const fromAccount = await AccountTable.findOne({ userID: from });
        if (!fromAccount || fromAccount.balance < money) {
            return res.status(400).json({ msg: "Insufficient balance" });
        }

        const toAccount = await AccountTable.findOne({ userID: to });
        if (!toAccount) {
            return res.status(400).json({ msg: "Account not found" });
        }

        const fromUpdate = await AccountTable.updateOne({ userID: from }, { $inc: { balance: -money } });
        if (fromUpdate.modifiedCount === 0) {
            return res.status(500).json({ msg: "Failed to deduct amount from sender" });
        }

        const toUpdate = await AccountTable.updateOne({ userID: to }, { $inc: { balance: money } });
        if (toUpdate.modifiedCount === 0) {
            // Rollback first update if second fails (not ideal but safer)
            await AccountTable.updateOne({ userID: from }, { $inc: { balance: money } });
            return res.status(500).json({ msg: "Failed to credit amount to receiver" });
        }

        res.status(200).json({ msg: "Transaction completed successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Transaction failed", error: error.message });
    }
});


module.exports = router;
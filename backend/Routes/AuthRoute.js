const express = require('express');
const userModel = require('../DB/Schema/Schema');
const router = express.Router()
const zod = require('zod');
const SECRET = require('../config/config');
const jwt = require('jsonwebtoken');
const authMiddleWare = require('../Middlewares/auth');
const AccountTable = require('../DB/Schema/BankSchema');


router.post('/login', authMiddleWare ,async(req,res)=> {
    const userLogin = zod.object({
        username: zod.string().min(6).email(),
        password : zod.string().min(6)
    });
    const result = userLogin.safeParse(req.body);
    if(!result) {
        return res.status(411).json({
            msg:"Enter valid Credentials"
        })
    }
    try {
        const data = await userModel.findOne({username: req.body.username});
        if(data){
            const token = jwt.sign({userID:data._id}, SECRET);
            const bankDetails = await AccountTable.findOne({userID: data._id})
            console.log(data);
            res.status(200).json({
                msg: "Logged In Successfully",
                token: token,
                userData: data,
                balance: bankDetails.balance,
                id: data._id
            });
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/sign-up' ,async (req,res)=> {
    const userSignup = zod.object({
        username: zod.string().min(6).email(),
        password : zod.string().min(6),
        firstName : zod.string().min(4).max(20),
        lastName : zod.string().min(4).max(20),
    });

    const result = userSignup.safeParse(req.body);
    if(!result) {
        return res.status(411).json({
            msg: "Enter Valid Credentials"
        })
    }  

    try {

        const existingUser = await userModel.findOne({username: req.body.username});
        if(existingUser) {
            return res.status(411).json({
                msg: "User Already Exists"
            })
        }

        const data = await userModel.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        const userID = data._id;

        await AccountTable.create({
            userID,
            balance: Math.floor(10 + (Math.random() * 100000))
        });

        const token = jwt.sign({userID}, SECRET)
        
        res.status(200).json({
            msg: "User created Successfully",
            token: token
        });
    } catch (error) {
        console.log(error)
    }
})

router.put('/update', authMiddleWare ,async(req,res)=> {
    const updateBody = zod.object({
        username: zod.string().optional(),
        password: zod.string().optional(),
        firstName: zod.string().optional(),
        lastName: zod.string().optional(),
    })

    const result = updateBody.safeParse(req.body);
    if(!result) {
        return res.status(411).json({
            msg:"User not Found"
        });
    }

    try {
        const user = await userModel.findOne({username: req.body.username});
        const data = await userModel.updateOne({_id: user._id}, req.body);

        res.status(200).json({
            msg: "User details Updated successfully"
        });
    } catch (error) {
        return res.status(411).json({
            msg:"User not Found"
        });
    }

})


module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const SECRET = require('../config/config');
const userModel = require('../DB/Schema/Schema');


const authMiddleWare = async (req,res,next) => {
    const authHeaders = req.headers.authorization;

    if(!authHeaders || !authHeaders.startsWith('Bearer')) {
        return res.status(411).json({
            msg: "Bearer Not Found"
        });
    }

    const token = authHeaders.split(' ')[1];
    const user = await userModel.findOne({username: req.body.username});

    try {
        const decode = jwt.verify(token, SECRET);
        console.log(decode);
        if(user._id == decode.userID) {
            console.log("Verified")
            next();
        } else {
            res.status(411).json({
                msg: "User not Verified"
            });
        }
    } catch (error) {
        // return res.status(411).json({
        //     msg: "User Not Verified"
        // });
        console.log(error)
    }
}


module.exports = authMiddleWare;
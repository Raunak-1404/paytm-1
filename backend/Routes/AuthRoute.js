const express = require('express');
const userModel = require('../DB/Schema/Schema');
const router = express.Router()
const zod = require('zod');
const SECRET = require('../config/config');
const jwt = require('jsonwebtoken');
const authMiddleWare = require('../Middlewares/auth');

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
            res.status(200).json({
                msg: "Logged In Successfully",
                token: token
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
        const token = jwt.sign({userID}, SECRET)

        res.status(200).json({
            msg: "User created Successfully",
            token: token
        });
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;
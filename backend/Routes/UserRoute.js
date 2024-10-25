const express = require('express');
const router = express.Router();
const userModel = require('../DB/Schema/Schema');
const zod = require('zod');

router.get('/get-users', async (req,res)=> {
    const filter = req.query.filter || "";
    
    try {
        const users = await userModel.find({
            $or:[
                {
                    firstName: {
                        "$regex": filter
                    }
                },
                {
                    lastName: {
                        "$regex": filter
                    }
                }
            ]
        });

        if(users.length === 0) {
            return res.status(411).json({
                msg: "User Not found"
            })
        }

        res.status(200).json({
            user: users.map((user)=>({
                username: user.username,
                firstName: user.firstName,
                lastname: user.lastName,
                _id: user._id
            }))
        });

    } catch (error) {
        res.status(411).json({
            msg: "Cannot find User"
        });
    }    

})

module.exports = router;
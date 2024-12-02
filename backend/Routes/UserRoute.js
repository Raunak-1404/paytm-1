const express = require('express');
const router = express.Router();
const userModel = require('../DB/Schema/Schema');
const zod = require('zod');

router.get('/get-users', async (req,res)=> {
    const filter = req.query.filter || "";
    if(filter.length === 0) {
        return res.json([]);
    }
    
    try {
        const users = await userModel.find({
            $or:[
                {
                    firstName: {
                        "$regex": filter,
                        "$options": "i"
                    }
                },
                {
                    lastName: {
                        "$regex": filter,
                        "$options": "i"
                    }
                }
            ]
        });

        if(users.length === 0) {
            return res.json([]);
        }

        res.status(200).json(
            users.map((user) => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        );

    } catch (error) {
        res.status(411).json({
            msg: "Cannot find User"
        });
    }    

})

module.exports = router;
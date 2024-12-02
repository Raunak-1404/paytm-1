const express = require('express');
const jwt = require('jsonwebtoken');
const SECRET = require('../config/config');
const userModel = require('../DB/Schema/Schema');


const authMiddleware = async (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith('Bearer')) {
        return res.status(401).json({
            msg: "Bearer token not found or malformed",
        });
    }

    const token = authHeaders.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET);

        // Fetch the user based on decoded token
        const user = await userModel.findById(decoded.userID);

        if (!user) {
            return res.status(401).json({
                msg: "User not found or invalid token",
            });
        }

        console.log("Verified User:", user.username);
        req.user = user; // Attach the user to the request for later use
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        return res.status(401).json({
            msg: "Invalid or expired token",
        });
    }
};

module.exports = authMiddleware;
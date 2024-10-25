const express = require("express");
const db = require('./DB/connection');
const userModel = require('./DB/Schema/Schema');
const app = express();
// const router = express.Router();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/auth', require('./Routes/AuthRoute'));
app.use('/users',require('./Routes/UserRoute'));
app.use('/account', require('./Routes/AccountRoute'));

app.listen(3000,()=> {
    console.log("Server Started on port 3000");
})




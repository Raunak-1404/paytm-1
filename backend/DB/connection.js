const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/paytmNew")
.then(()=> {
    console.log("Database Connected");
}) 
.catch((e)=> {
    console.log(e);
});

const db = mongoose.connection;

module.exports = db;
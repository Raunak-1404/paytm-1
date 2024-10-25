const mongoose = require('mongoose')

const Account = mongoose.Schema({
    userID: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'UserSchema',
        required : true
    },
    balance: {
        type: Number,
        required: true
    }
});

const AccountTable = mongoose.model('AccountTable', Account);

module.exports = AccountTable;
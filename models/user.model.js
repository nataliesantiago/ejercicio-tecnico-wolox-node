const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    user_name  : {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    preferred_currency: {
        required: true,
        type: String
    }
});
module.exports = mongoose.model('user', UserSchema);
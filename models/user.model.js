const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    user_name: {
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
    },
    coins: [{
        type: String
    }]
});

UserSchema.pre('save', async function () {
    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hashSync(this.password, 10);
        } catch (error) {
            console.log(error);
        }
    }
});

UserSchema.methods.validPassword = async function (password) {
    return await bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('user', UserSchema);
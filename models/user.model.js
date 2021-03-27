const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { valiatePassword } = require('../utils/validators');
const Schema = mongoose.Schema;

let UserSchema = Schema({
    first_name: {
        required: [true, 'Campo requerido'],
        type: String
    },
    last_name: {
        required: [true, 'Campo requerido'],
        type: String
    },
    user_name: {
        required: [true, 'Campo requerido'],
        type: String,
        unique: [true, 'El nombre de usuario ya esta en uso']
    },
    password: {
        required: [true, 'Campo requerido'],
        type: String,
        validate: {
            validator: valiatePassword,
            message: 'La contraseña debe ser almenos de 8 caracteres y alfanumérica'
        }
    },
    preferred_currency: {
        required: [true, 'Campo requerido'],
        type: String,
        enum: {
            values: ['eur','usd','ars'],
            message: (t) => {
                return `${t.value} no es un valor valido para preferred_currency, los valores permitidos son ${t.enumValues}`;
            }
        }
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
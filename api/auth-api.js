const express = require('express');
const jwt = require('jsonwebtoken');
const UserController = require('./../controllers/user-controller');
const secret = require('./../config/secret');

const route = express.Router();
let userController = new UserController();

route.post('/register', async (req, res) => {
    const userDto = req.body;
    try {
        const user = await userController.saveUser(userDto);
        res.status(200).json({
            success: true,
            message: "Usuario creado con éxito",
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'No se pudo crear el usuario'
        });
    }
});

route.post('/login', async (req, res) => {
    let { user_name, password } = req.body;
    const user = await userController.getUser(user_name);
    if (user) {
        let valid = await user.validPassword(password);
        if (valid) {
            let token = jwt.sign({ user },
                secret.secret,
                {
                    expiresIn: '30m' // expires in 24 hours
                }
            );
            // return the JWT token for the future API calls
            res.status(200).send({
                success: true,
                message: 'Autententicación exitosa',
                token: token
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Nombre de usuario o contraseña erronea'
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Nombre de usuario o contraseña erronea'
        });
    }
});

module.exports = route;

const express = require('express');
const UserController = require('../controllers/user-controller');

const route = express.Router();
let userController = new UserController();

route.post('/create-user', async (req, res) => {
    const userDto = req.body;
    try {
        const user = await userController.saveUser(userDto);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json();
    }
});

route.get('/user', async (req, res) => {
    try {
        const userName = req.query.user_name;
        const user = await userController.getUser(userName);
        res.status(200).json(user);
    } catch (error) {
        res.status(400)
    }
});

module.exports = route;

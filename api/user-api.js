const express = require('express');
const UserController = require('../controllers/user-controller');

const route = express.Router();
let userController = new UserController();

route.get('/user', async (req, res) => {
    try {
        const userName = req.query.user_name;
        const user = await userController.getUser(userName);
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'No fue posible realizar la operacón'
        });
    }
});

route.get('/list-top-coins', async (req, res) => {
    try {
        const user = req.user.user;
        const nTop = req.query.top;
        const order = req.query.order;
        if (nTop <= 25) {
            const listTop = await userController.getTopCoins(user, nTop, order);
            res.status(200).json({
                success: true,
                coins: listTop
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'El número top debe ser menos o igual a 25'
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'No fue posible realizar la operacón'
        });
    }
});

module.exports = route;

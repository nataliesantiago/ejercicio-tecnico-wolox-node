const express = require('express');
const CryptoController = require('../controllers/crypto-controller');

const route = express.Router();
let cryptoController = new CryptoController();

route.get('/coins-list', async (req, res) => {
    try {
        const userName = req.query.user_name;
        const user = await cryptoController.getUser(userName);
        res.status(200).json(user);
    } catch (error) {
        res.status(400)
    }
});

module.exports = route;

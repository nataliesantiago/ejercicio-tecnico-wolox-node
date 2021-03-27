const express = require('express');
const CoinController = require('../controllers/coin-controller');

const route = express.Router();
let coinController = new CoinController();

route.get('/coins-list', async (req, res) => {
    try {
        const user = req.user.user;
        const page = req.query.page;
        const coins = await coinController.getCoinsList(user.preferred_currency, page);
        res.status(200).json(coins);
    } catch (error) {
        res.status(400)
    }
});

module.exports = route;

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

route.post('/add-coin', async (req, res) => {
    try {
        const user = req.user.user;
        const coinId = req.body.coin_id;
        const coins = await coinController.saveCoinByUser(user._id, coinId);
        if (coins !== null) {
            res.status(200).json({
                success: true,
                message: 'Criptomoneda agregada con éxito'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'La criptomoneda no existe'
            });
        }
    } catch (error) {
        console.log('err', error);
        res.status(400)
    }
});

module.exports = route;

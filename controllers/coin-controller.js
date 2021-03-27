const userModel = require('../models/user.model');
const ExternalServices = require('../services/external-services');
let externalServices = new ExternalServices();
class CoinController {

    constructor() { }

    async getCoinsList(currency, page) {
        const coinsList = await externalServices.getCoinsList(currency, page);
        return coinsList;
    }

    async saveCoinByUser(userId, coinId) {
        const coin = await externalServices.getCoin(coinId);
        if (coin !== null) {
            const user = await userModel.findByIdAndUpdate(userId, {
                $addToSet: { coins: coinId }
            });
            return user;
        } else {
            return null;
        }
    }

}

module.exports = CoinController;
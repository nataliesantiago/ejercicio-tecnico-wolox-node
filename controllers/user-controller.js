const userModel = require('../models/user.model');
const ExternalServices = require('../services/external-services');
let externalServices = new ExternalServices();
class UserController {

    constructor() { }

    async getUser(userName) {
        const user = await userModel.findOne({ user_name: userName });
        return user;
    }

    async saveUser(userDto) {
        const user = new userModel(userDto);
        await user.save();
        return user;
    }

    async getTopCoins(user, nTop, order) {
        const infoUser = await this.getUser(user.user_name);
        if (infoUser.coins.length > 0) {
            const coinsUser = infoUser.coins.toString();
            let orderList = order === 'asc' ? 'market_cap_asc' : 'market_cap_desc';
            const currencies = ['eur', 'usd', 'ars'];
            const indexCurrency = currencies.indexOf(user.preferred_currency);
            currencies.splice(indexCurrency, 1);

            const coinsListCurrencyUser = await externalServices.getCoinsTopList(user.preferred_currency, coinsUser, orderList);
            const coinsListCurrency1 = await externalServices.getCoinsTopList(currencies[0], coinsUser, orderList);
            const coinsListCurrency2 = await externalServices.getCoinsTopList(currencies[1], coinsUser, orderList);

            const coinsListFinal = coinsListCurrencyUser.map(coinUser => {
                coinUser[`price_${user.preferred_currency}`] = coinUser.price;
                delete coinUser.price;

                const findPrice1 = coinsListCurrency1.find(coin1 => coin1.id === coinUser.id);
                if (findPrice1 !== undefined) {
                    coinUser[`price_${currencies[0]}`] = findPrice1.price;
                }

                const findPrice2 = coinsListCurrency2.find(coin2 => coin2.id === coinUser.id);
                if (findPrice2 !== undefined) {
                    coinUser[`price_${currencies[1]}`] = findPrice2.price;
                }
                return coinUser
            });

            const coinsList = coinsListFinal.slice(0, nTop);
            return coinsList;
        } else {
            return null;
        }
    }

}

module.exports = UserController;
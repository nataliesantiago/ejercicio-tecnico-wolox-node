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
        await user.save(userDto);
        return user;
    }

    async getTopCoins(user, nTop, order) {
        const coinsUser = user.coins.toString();
        let orderList;
        console.log(order);
        if (order === 'asc') {
           orderList = 'market_cap_asc'; 
        } else {
            orderList = 'market_cap_desc';
        }
        const coinsListCurrencyUser = await externalServices.getCoinsTopList(user.preferred_currency, coinsUser, orderList);
        console.log(coinsListCurrencyUser);
        // return coinsList;
    }

}

module.exports = UserController;
const axios = require('axios');
const userModel = require('../models/user.model');
class CoinController {

    constructor() { }

    async getCoinsList(currency, page) {
        try {
            const coinsList = await axios.get(`${process.env.URL_COINS_API}/coins/markets`, {
                params: {
                    vs_currency: currency,
                    page
                }
            });

            const coinsListFinal = coinsList.data.map(coin => {
                return {
                    id: coin.id,
                    symbol: coin.symbol,
                    price: coin.current_price,
                    name: coin.name,
                    image: coin.image,
                    last_updated: coin.last_updated
                }
            });
            return coinsListFinal;
        } catch (error) {
            return null;
        }
    }

    async saveCoinByUser(userId, coinId) {
        const coin = await this.getCoin(coinId);
        console.log(coin);
        if (coin !== null) {
            const user = await userModel.findByIdAndUpdate(userId, {
                $addToSet: { coins: coinId }
            });
            return user;
        } else {
            return null;
        }
    }

    async getCoin(userId, coinId) {
        try {
            const coin = await axios.get(`${process.env.URL_COINS_API}/coins/${coinId}`);
            // const coinFinal = {
            //     id: coinData.id,
            //     symbol: coinData.symbol,
            //     argentine_price: coinData.market_data.current_price.ars,
            //     dolar_price: coinData.market_data.current_price.usd,
            //     euro_price: coinData.market_data.current_price.eur,
            //     name: coinData.name,
            //     image: coinData.image.large,
            //     last_updated: coinData.last_updated
            // };
            console.log(coin);
            return coin;
        } catch (error) {
            return null;
        }
    }

}

module.exports = CoinController;
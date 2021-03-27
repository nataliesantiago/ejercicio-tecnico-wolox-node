const axios = require('axios');

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
                    symbol: coin.symbol,
                    price: coin.current_price,
                    name: coin.name,
                    image: coin.image,
                    last_updated: coin.last_updated
                }
            });
            return coinsListFinal;
        } catch (error) {
            return error;
        }
    }

}

module.exports = CoinController;
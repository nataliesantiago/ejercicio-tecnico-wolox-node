const axios = require('axios');

class CoinController {

    constructor() { }

    async getCoinsList(currency, page) {
        try {
            axios.get(`${process.env.URL_COINS_API}/coins/markets`, {
                params: {
                    vs_currency: currency,
                    page
                }
            }).then((result) => {
                console.log('res', result);
            }).catch((err) => {
                console.log('err', err);
            });
        } catch (error) {
            console.error(error)
        }
    }

}

module.exports = CoinController;
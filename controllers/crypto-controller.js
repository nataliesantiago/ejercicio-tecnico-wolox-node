const axios = require('axios');

class CryptoController {

    constructor() { }

    async getCryptoList() {
        try {
            axios.get(`${process.env.URL_CRYPTO_API}/coins/markets`, {
                params: {
                    vs_currency: 'eur' 
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

module.exports = CryptoController;
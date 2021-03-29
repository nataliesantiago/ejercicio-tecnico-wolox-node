const axios = require('axios');

class ExternalServices {

    constructor() { }

    /**
     * Funcion que llama al servicio externo de criptomonedas para obtener el listado de las criptomonedas disponibles
     * @param {*} currency
     * @param {*} page
     * @returns
     */
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

    /**
     * Funcion que llama al servicio externo de criptomonedas para obtener la informacion de una criptomoneda especifica
     * @param {*} coinId
     * @returns
     */
    async getCoin(coinId) {
        try {
            const coin = await axios.get(`${process.env.URL_COINS_API}/coins/${coinId}`);
            return coin;
        } catch (error) {
            return null;
        }
    }

    /**
     * Funcion que llama al servicio externo de criptomonedas para obtener la lista de criptomonedas relacionadas a un usuario
     * @param {*} currency
     * @param {*} coinsListId
     * @param {*} order
     * @returns
     */
    async getCoinsTopList(currency, coinsListId, order) {
        try {
            const coinsList = await axios.get(`${process.env.URL_COINS_API}/coins/markets`, {
                params: {
                    vs_currency: currency,
                    ids: coinsListId,
                    order
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

}

module.exports = ExternalServices;
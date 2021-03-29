const jwt = require('jsonwebtoken');
const config = require('./../config/secret');

class CheckToken {

    /**
     * Funcion para verificar si el token es valido o no
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns
     */
    checkToken (req, res, next) {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
    
        if (token) {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'Token no valido'
                    });
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Token no proporcionado'
            });
        }
    }
}

module.exports = CheckToken;

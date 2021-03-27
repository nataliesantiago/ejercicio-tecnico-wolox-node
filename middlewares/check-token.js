const jwt = require('jsonwebtoken');
const config = require('./../config/secret');

class CheckToken {

    checkToken (req, res, next) {
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    
        if (token) {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.status(301).json({
                        success: false,
                        message: 'Token no valido'
                    });
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else {
            return res.status(301).json({
                success: false,
                message: 'Token no proporcionado'
            });
        }
    }
}

module.exports = CheckToken;

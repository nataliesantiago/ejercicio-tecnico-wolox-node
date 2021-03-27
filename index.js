const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const dotenv = require('dotenv');
const connection = require('./config/connection');
const CheckToken = require('./middlewares/check-token');
const authApi = require('./api/auth-api');
const userApi = require('./api/user-api');
const coinApi = require('./api/coin-api');

let checkTokenMiddleware = new CheckToken();

dotenv.config({ path: 'env/.env.dev' });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());


morgan.token('host', function(req, res) {
	return req.hostname;
});

// define custom logging format
morgan.token('detailed', function (req, res, param) {                                    
    return JSON.stringify(req.body);
});  

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
});

// register logging middleware and use custom logging format
app.use(morgan('method :url :status :res[content-length] - :response-time ms :detailed'));

// middelware
app.use(/^\/api\/(?!auth*).*/, checkTokenMiddleware.checkToken);

app.use('/api/auth', authApi);
app.use('/api/users', userApi);
app.use('/api/coins', coinApi);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
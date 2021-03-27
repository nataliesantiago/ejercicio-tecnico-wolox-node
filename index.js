const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const connection = require('./config/connection');
const userApi = require('./api/user-api');

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

// register logging middleware and use custom logging format
app.use(morgan('method :url :status :res[content-length] - :response-time ms :detailed'));

app.use('/api/users', userApi);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
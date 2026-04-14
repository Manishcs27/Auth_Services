const express = require('express');

const { PORT } = require('./config/serverConfig');
const app = express();
const bodyParser = require('body-parser');



const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Auth Service is running on port ${PORT}`);
    });
};

startServer();
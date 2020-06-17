const express = require('express');
const logger = require('./_middlewares/console_logs');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(logger);


server.use('/api/users', require('./_routes/users'));


const PORT = 3000, HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`Serving on port ${PORT}`);
});
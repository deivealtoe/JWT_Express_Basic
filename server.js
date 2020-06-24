const express = require('express');
const cors = require('cors');
const logger = require('./_middlewares/console_logs');


const server = express();


server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());


// Importing to the 'server' the logger middleware
server.use(logger);


// Using routers in another folder
server.use('/api/users', require('./_routes/users'));


const PORT = 3000, HOST = '0.0.0.0';


server.listen(PORT, HOST, () => {
    console.log(`Serving on port ${PORT}`);
});
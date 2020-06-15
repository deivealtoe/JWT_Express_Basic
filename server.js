const express = require('express');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));





server.use('/api/users', require('./_routes/users'));





const PORT = 3000, HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`Serving on port ${PORT}`);
});
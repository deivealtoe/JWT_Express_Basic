const moment = require('moment');

module.exports = (request, response, next) => {

    console.log(`Access from: ${request.protocol}://${request.get('host')}${request.originalUrl} - At: ${moment().format()}`);
    
    next();
};
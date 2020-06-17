const jwt = require('jsonwebtoken');
const authConfig = require('../_config/auth.json');

module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ msg: "No token provided" });
    }

    // Token format: Bearer <token_hash>
    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return response.status(401).json({ msg: "Token error" });
    }

    const [ bearer, token ] = parts;

    if (!bearer === "Bearer") {
        return response.status(401).json({ msg: "Token malformatted" });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return response.status(401).json({ msg: "Invalid token", err });
        }

        request.userId = decoded.id;

        return next();
    });

};
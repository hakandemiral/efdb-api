const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authToken = req.header('authToken');

    if (authToken) {
        jwt.verify(
            authToken,
            process.env.JWT_SECRET_KEY,
            (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        status: false,
                        message: 'Authentication failed, invalid token!',
                    });
                } else {
                    req.decode = decoded;
                    next();
                }
            },
        );
    } else {
        res.status(401).json({
            status: false,
            message: 'Authentication failed, no token provided!',
        });
    }
};

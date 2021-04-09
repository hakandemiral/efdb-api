const User = require('../models/User');

module.exports = (req, res, next) => {
    const { userId } = req.decode;

    User.findById(userId)
        .then((user) => {
            if(user.isAdmin) {
                next();
            } else {
                res.status(401).json({errMsg: "what the fuck are you trying to do?"})
            }
        })
}
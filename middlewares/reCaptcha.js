const axios = require('axios');

module.exports = (req, res, next) => {
    const { gCaptcha } = req.body;
    const secret = process.env.G_CAPTCHA;

    axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${gCaptcha}`)
        .then(({ data }) => {
            if(data.success){
                next();
            } else {
                res.status(401).json({errMsg: "Google reCaptcha validation failed. (Google side)"})
            }
        })
        .catch((err) => {
            res.status(401).json({errMsg: "Google reCaptcha validation failed. (Server side)"})
        })
};
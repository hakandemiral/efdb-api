const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = {
    login(req, res) {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(401).json({
                status: false,
                message: 'Authentication failed, username/e-mail and password required!',
            });
        }

        User.findOne({ email })
            .then((user) => {
                if(!user){
                    res.status(404).send("Authentication failed, user not found!")
                } else {
                    bcrypt.compare(password, user.password)
                        .then((result) => {
                            if(result){
                                const payload = {
                                    userId: user._id,
                                }

                                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                                    expiresIn: '1 day',
                                })

                                res.status(200).json({
                                    token,
                                    expire: 1
                                })
                            } else {
                                res.status(401).json({errMsg: "Server error"});
                            }
                        })
                        .catch(() => res.status(501).json({errMsg: "Server error"}));
                }
            })
    },
    create(req, res) {
        const { userName, email, password} = req.body;

        if(userName && email && password) {
            bcrypt.hash(password.toString(), 10, (hashErr, hash) => {
                if(!hashErr) {
                    const user = new User({
                        userName,
                        email,
                        password: hash,
                    });

                    user.save()
                        .then((data) => {
                            const payload = {
                                userId: data._id
                            };

                            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                                expiresIn: '1 day',
                            })
                            console.log(JSON.stringify(data));

                            res.status(201).json({
                                token,
                                expire: 1
                            })
                        })
                        .catch((err) => {
                            res.status(501).send("Error!")
                        });

                }else {
                    res.status(501).send("server error, password err!")
                }
            })
        }
    }
};

module.exports = userController;
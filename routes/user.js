const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const reCaptcha = require('../middlewares/reCaptcha');

router.post('/login', reCaptcha, userController.login);
router.post('/register', reCaptcha,userController.create);

module.exports = router;

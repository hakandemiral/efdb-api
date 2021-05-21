const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const reCaptcha = require('../middlewares/reCaptcha');
const verifyToken = require('../middlewares/verifyToken');

router.post('/login', reCaptcha, userController.login);
router.post('/register', reCaptcha, userController.create);
router.post('/addMovieToWatchList', verifyToken, userController.addMovieToWatchList);
router.post('/removeMovieFromWatchList', verifyToken, userController.removeMovieFromWatchList);
router.get('/getUserWatchList', verifyToken, userController.getUserWatchList);
router.post('/toggleIsWatchedFromWatchList', verifyToken, userController.toggleIsWatchedFromWatchList);

module.exports = router;

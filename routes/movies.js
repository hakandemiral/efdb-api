const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');
const movieController = require('../controllers/movieController');

router.post('/add', verifyToken ,movieController.create);
router.post('/search', verifyToken, isAdmin ,movieController.search);
router.get('/get/:movie_id', movieController.get);
router.get('/get/local/:objectId', movieController.getLocalMovie);
router.get('/getAllMovies', movieController.getAllMovies);

module.exports = router;

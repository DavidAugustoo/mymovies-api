const express = require('express');
const controller = require('../controller/MovieController');
const authService = require('../services/authService');
const searchMovie = require('../services/searchMovie');
const router = express.Router();

router.get('/', authService.authorize, controller.all);
router.post('/', authService.authorize, searchMovie.findMovie, controller.add);
router.put('/:id', authService.authorize, searchMovie.findMovie, controller.edit);
router.delete('/:id', authService.authorize, controller.delete);

module.exports = router;
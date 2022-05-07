const express = require('express');
const controller = require('../controller/MovieController');
const authService = require('../services/authService');
const router = express.Router();

router.get('/', authService.authorize, controller.all);
router.post('/', authService.authorize, controller.add);
router.put('/', authService.authorize, controller.edit);
router.delete('/', authService.authorize, controller.delete);

module.exports = router;
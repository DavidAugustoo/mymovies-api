const express = require('express');
const controller = require('../controller/UserController');
const router = express.Router();

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);

module.exports = router;
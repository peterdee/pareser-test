const express = require('express');

const controller = require('./parse.controller');

const router = express.Router();

router.get('/', controller.startParsing);

module.exports = router;

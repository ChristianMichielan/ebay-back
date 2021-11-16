var express = require('express');
var router = express.Router();
var bienController = require('../controllers/bienController');

router.get('/', function(req, res, next) {
    bienController.getBiens(req, res, next);
});

module.exports = router;

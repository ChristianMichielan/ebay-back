var express = require('express');
var router = express.Router();
var tokenController = require('../controllers/tokenController');

router.post('/', function(req, res, next) {
    tokenController.connecter(req, res, next )
});

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;

var express = require('express');
var router = express.Router();
var tokenController = require('../controllers/tokenController');

router.post('/token', function(req, res, next) {
    tokenController.connecter(req, res, next )
});

module.exports = router;

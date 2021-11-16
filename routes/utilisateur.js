var express = require('express');
var router = express.Router();
var utilisateurController = require('../controllers/utilisateurController');
var multer  = require('multer');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  utilisateurController.creerUnCompte(req, res, next);
});

// Stockage avatar
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});

var upload = multer({ storage: storage });

router.post('/:idUtilisateur/photo', upload.single('avatar'), (req, res) => {
  utilisateurController.mettreAJourPhoto(req.file.path, req, res);
});
module.exports = router;

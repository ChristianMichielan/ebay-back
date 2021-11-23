var express = require('express');
var router = express.Router();
var utilisateurController = require('../controllers/utilisateurController');
var bienController = require('../controllers/bienController');
var multer  = require('multer');

/***********  Helper Stockage IMAGE ***********/

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});

var upload = multer({ storage: storage });

/*********** Routes API ***********/

/**
 * /api/v1/utilisateur
 * Permet d'obtenir un utilisateur
 */
router.get('/:idU', function(req, res, next) {
  utilisateurController.getInfoUser(req,res)
  
});

/**
 *  /api/v1/utilisateur
 *  Permet de créer un utilisateur
 */
router.post('/', function(req, res, next) {
  utilisateurController.creerUnCompte(req, res, next);
});

/**
 * api/v1/{idUtilisateur}/photo
 * Permet d'ajouter une photo à l'utilisateur
 */
router.post('/:idUtilisateur/photo', upload.single('avatar'), (req, res) => {
  utilisateurController.mettreAJourPhoto(req.file.path, req, res);
});

/**
 * api/v1/{idUtilisateur}/bien
 * Creer une annonce de bien aux enchères pour un utilisateur
 * */
router.post('/:idUtilisateur/bien', function(req, res, next) {
  bienController.creerUnBien(req, res, next);
});

module.exports = router;

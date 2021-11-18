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
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
 * api/v1/utilisateur/{idUtilisateur}/bien/avendre
 * Retourne les biens vendus (qui sont à livrer), non vendus et livrés à l'acheteur
 */
router.get('/:idUtilisateur/bien/avendre', function (req, res, next) {
  bienController.getBiensVendus(req, res, next);
})

/**
 * api/v1/utilisateur/{idUtilisateur}/bien/encours
 * Retourne les biens sur lesquelles l'utilisateur à réaliser une encère et qui sont encore en cours.
 */
router.get('/:idUtilisateur/bien/encours', function (req, res, next) {
  bienController.getEncheresEnCours(req, res, next);
})

/**
 * api/v1/utilisateur/{idUtilisateur}/bien/livraisons
 * Retourne les biens sur lesquelles l'utilisateur a remporté l'enchère ou qui lui ont été livré.
 */
router.get('/:idUtilisateur/bien/livraisons', function (req, res, next) {
  bienController.getLivraisons(req, res, next);
})

/**
 * api/v1/{idUtilisateur}/bien
 * Creer une annonce de bien aux enchères pour un utilisateur
 * */
router.post('/:idUtilisateur/bien', function(req, res, next) {
  bienController.creerUnBien(req, res, next);
});

module.exports = router;

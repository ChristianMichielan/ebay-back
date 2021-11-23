var express = require('express');
var router = express.Router();
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

/**
 * api/v1/bien/
 * Permet d'obtenir tous les biens
 * */
router.get('/', function(req, res, next) {
    bienController.getBiens(req, res, next);
});

/**
 * api/v1/bien/{idBien}
 * Permet d'obtenir les infos d'un bien en particulier
 * */
router.get('/:idBien', function(req, res, next) {
    bienController.getUnBien(req, res, next);
});

/**
 * api/v1/bien{idBien}/photo
 * Ajoute une photo pour un bien aux enchères
 * */
router.post('/:idBien/photobien', upload.single('bien'), (req, res) => {
    bienController.mettreAJourPhotoBien(req.file.path, req, res);
});
module.exports = router;

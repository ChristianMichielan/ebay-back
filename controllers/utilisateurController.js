const { QueryTypes } = require('sequelize');
const { model } = require('../bdd/connect');
var sequelize = require('../bdd/connect');
var initModels = require('../models/init-models');
var models = initModels(sequelize);

module.exports.creerUnCompte = (req, res, next) => {
    let pseudo = req.body.pseudoU;
    let motDePasse = req.body.motDePasseU;
    let nom = req.body.nomU;
    let prenom = req.body.prenomU;
    let email = req.body.emailU;
    let geolocLat = req.body.geolocalisationLatU;
    let geolocLong = req.body.geolocalisationLongU;

    models.utilisateur.create({ pseudoU: pseudo, motDePasseU: motDePasse, nomU: nom, prenomU: prenom,
    emailU: email, geolocalisationLatU: geolocLat, geolocalisationLongU: geolocLong}).then(
        utilisateur => {
            console.log(utilisateur);
            return res.status(201).json({
                idU: utilisateur.idU,
                pseudoU: utilisateur.pseudoU
            });
        }
    ).catch(error => {
        res.status(400).json({
            message: error
        })
    });
};

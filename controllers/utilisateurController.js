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
    let email = req.body.mailU;
    let geolocLat = req.body.geolocalisationLatU;
    let geolocLong = req.body.geolocalisationLongU;
    let adresse = req.body.adresseU;

    models.utilisateur.create({ pseudoU: pseudo, motDePasseU: motDePasse, nomU: nom, prenomU: prenom,
    mailU: email, geolocalisationLatU: geolocLat, geolocalisationLongU: geolocLong, adresseU: adresse}).then(
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


module.exports.mettreAJourPhoto = (fileUrl, req, res) => {

    pIdUtilisateur = req.params.idUtilisateur;
    sqlUpdateUtilisateur = "UPDATE utilisateur SET photoU = :photoU WHERE idU = :idU";

    sequelize.query(sqlUpdateUtilisateur, {
        replacements: { photoU: fileUrl, idU: pIdUtilisateur },
        type: QueryTypes.UPDATE
    }).then(() => {
        return res.status(201).json({
            message: "Enregistrement effectué"
        });
})};

const { QueryTypes } = require('sequelize');
const { model } = require('../bdd/connect');
var sequelize = require('../bdd/connect');
var initModels = require('../models/init-models');
var models = initModels(sequelize);

module.exports.connecter = (req, res, next) => {
    let pseudo = req.body.pseudo;
    let motDePasse = req.body.motDePasse;

    models.utilisateur.findOne({
        where: {
            pseudoU: pseudo,
            motDePasseU: motDePasse
        }
    }).then(utilisateur => {
        console.log(utilisateur);
        return res.status(201).json({
            idU: utilisateur.idU,
            pseudoU: utilisateur.pseudoU
        });
    }).catch(error => {
        console.log(error);
        return res.status(401).json(
            { message: "Erreur d'authentification" }
        )
    })
};

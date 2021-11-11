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
            pseudo: pseudo,
            motDePasse: motDePasse
        }
    }).then(utilisateur => {
        console.log(utilisateur)
        return res.status(201).json({
            utilisateur: {
                idUtilisateur: utilisateur.idUtilisateur,
                pseudo: utilisateur.pseudo
            }

        });
    }).catch(error => {
        console.log(error)
        return res.status(401).json(
            { message: "Erreur d'authentification" }
        )
    })
}

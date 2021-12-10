const { QueryTypes } = require('sequelize');
const { model } = require('../bdd/connect');
var sequelize = require('../bdd/connect');
var initModels = require('../models/init-models');
var models = initModels(sequelize);

/**
 * Permet de créer une livraison pour un utilisateur ayant gagné une enchère sur un bien
 *
 * @param req
 * @param res
 * @param next
 */
module.exports.creerUneLivraison = (req, res, next) => {
    let BIENidB = req.body.idB;
    let UTILISATEURidU = req.params.idUtilisateur;
    let dateL = req.body.dateL;

    models.livraison.create({ BIENidB: BIENidB, UTILISATEURidU: UTILISATEURidU, dateL: dateL}).then(
        livraison => {
            console.log(livraison);
        }
    ).catch(error => {
        res.status(400).json({
            message: error
        })
    });

    // Maj de l'état du bien pour le passer à livraison en cours
    sqlUpdateUtilisateur = "UPDATE bien SET etatB = :newEtat WHERE idB = :idB";
    sequelize.query(sqlUpdateUtilisateur, {
        replacements: { newEtat: 'livre', idB: BIENidB },
        type: QueryTypes.UPDATE
    }).then(() => {
        return res.status(201).json({
            message: "Livraison enregistrée"
        });
    })
};

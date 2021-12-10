const { QueryTypes } = require('sequelize');
const { model } = require('../bdd/connect');
var sequelize = require('../bdd/connect');
var initModels = require('../models/init-models');
var models = initModels(sequelize);

/**
 * Permet d'enchérir sur un bien (proposer un prix sur une enchère)
 * @param req
 * @param res
 * @param next
 */
module.exports.encherir = (req, res, next) => {
    let prix = req.body.prix;
    let idB = req.body.idB;
    let idUtilisateur = req.params.idUtilisateur;

    /* Vérification que la nouvelle enchère est > au prixPlancher
    Et Vérification que la nouvelle enchère est > au prix de la dernière enchère si il y en a une */
    sequelize.query('SELECT B.prixPlancherB, MAX(E1.prix) as prixEnchereCourante\n' +
        'FROM Bien B\n' +
        'LEFT JOIN encherir E1 ON B.idB = E1.BIENidB \n' +
        'WHERE B.idB = :idB\n' , {
        type: QueryTypes.SELECT,
        replacements: { idB: idB },
    }).then(bienRes => {
        if (bienRes[0].prixPlancherB > prix ||
            (bienRes[0].prixEnchereCourante !== null && bienRes[0].prixEnchereCourante > prix)) {
            return res.status(500).json({
                message: 'Impossible d\' ajouter le prix souhaité'
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: error
        });
    });

    // Créer nouvelle enchère
    models.encherir.create({ UTILISATEURidU: idUtilisateur, BIENidB: idB, prix: prix}).then(
        enchere => {
            return res.status(201).json({
                enchere: enchere
            });
        }
    ).catch(error => {
        res.status(400).json({
            message: error
        })
    });
};

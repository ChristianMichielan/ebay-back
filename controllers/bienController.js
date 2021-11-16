const { QueryTypes } = require('sequelize');
const { model } = require('../bdd/connect');
var sequelize = require('../bdd/connect');
var initModels = require('../models/init-models');
var models = initModels(sequelize);

module.exports.getBiens = (req, res, next) => {
    // A mettre à jour avec la photo dès que possible
    // Récupérer url de la photo, la chercher dans le dossier upload, la convertir en blob b64 et l'envoyer avec le retour API
    sequelize.query('SELECT * FROM bien', {
        type: QueryTypes.SELECT
    }).then(bienRes => {
        transformPhotoBase64(bienRes, res)
            .then(r => console.log('envoi réussi'))
            .catch(error => {
                res.status(500).json({
                    message: error
                });
            });
    }).catch(error => {
        res.status(500).json({
            message: error
        });
    });
};

async function transformPhotoBase64(bienRes, res) {
    const fs = require('fs').promises;
    for (const element of bienRes) {
        element.photoB = await fs.readFile(process.cwd() + '/' + element.photoB, {encoding: 'base64'});
    }
    res.status(200).json(
        {
            biens : bienRes
        }
    )
}

/**
 * Retourne pour UN utilisateur les biens qu'il a vendu (qui sont donc à livrer), non vendus et livrés à l'acheteur
 * @param req
 * @param res
 * @param next
 */
module.exports.getBiensVendus = (req, res, next) => {
    pIdUtilisateur = parseInt(req.params.idUtilisateur);
    var sqlQuery = "SELECT B.idB, B.nomB, B.descriptionB, B.photoB, B.etatB, E1.prix FROM Bien B, Encherir E1 WHERE B.UTILISATEURidU = :idUtilisateur AND B.etatB IN ('vendu', 'livre') AND E1.BIENidB = (SELECT E2.BIENidB FROM Encherir E2 WHERE E2.BIENidB = B.idB) UNION SELECT B2.idB, B2.nomB, B2.descriptionB, B2.photoB, B2.etatB, B2.prixPlancherB FROM Bien B2 WHERE B2.UTILISATEURidU = :idUtilisateur AND B2.etatB = 'non_vendu'";

    sequelize.query(sqlQuery, {
        replacements: { idUtilisateur: pIdUtilisateur },
        type: QueryTypes.SELECT
    }).then(bienRes => {
        res.status(200).json(
            {
                biens : bienRes
            }
        )
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: error
        });
    });
}

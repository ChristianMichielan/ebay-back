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

module.exports.creerUnBien = (req, res, next) => {
    let nom = req.body.nomB;
    let description = req.body.descriptionB;
    let prixPlancher = req.body.prixPlancherB;
    let etat = 'en_cours';
    let idUtilisateur = req.params.idUtilisateur;
    models.bien.create({ nomB: nom, descriptionB: description, prixPlancherB: prixPlancher, dateCreationB: sequelize.fn('NOW'),
        etatB: etat, UTILISATEURidU: idUtilisateur}).then(
        bien => {
            return res.status(201).json({
                bien: bien
            });
        }
    ).catch(error => {
        res.status(400).json({
            message: error
        })
    });
};

module.exports.mettreAJourPhotoBien = (fileUrl, req, res) => {

    pIdBien = req.params.idBien;
    sqlUpdateUtilisateur = "UPDATE bien SET photoB = :photoB WHERE idB = :idB";

    sequelize.query(sqlUpdateUtilisateur, {
        replacements: { photoB: fileUrl, idB: pIdBien },
        type: QueryTypes.UPDATE
    }).then(() => {
        return res.status(201).json({
            message: "Enregistrement effectué"
        });
    })};

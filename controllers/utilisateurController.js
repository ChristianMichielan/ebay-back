const { Router } = require('express');
const { QueryTypes } = require('sequelize');
const { model } = require('../bdd/connect');
var sequelize = require('../bdd/connect');
var initModels = require('../models/init-models');
const utilisateur = require('../models/utilisateur');
var models = initModels(sequelize);

/**
 * Permet de créer un compte
 *
 * @param req
 * @param res
 * @param next
 * @returns {Json | Promise<any> | any}
 */
module.exports.creerUnCompte = (req, res, next) => {
    let pseudo = req.body.pseudoU;
    let motDePasse = req.body.motDePasseU;
    let nom = req.body.nomU;
    let prenom = req.body.prenomU;
    let email = req.body.mailU;
    let geolocLat = req.body.geolocalisationLatU;
    let geolocLong = req.body.geolocalisationLongU;
    let adresse = req.body.adresseU;

    if (pseudo === undefined || motDePasse === undefined || nom === undefined || prenom === undefined ||
    email === undefined || adresse === undefined) {
        return res.status(401).json({
            message: 'Données manquantes'
        });
    }
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

/**
 * Met à jour un utilisateur en lui ajoutant sa photo
 * @param fileUrl
 * @param req
 * @param res
 */
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

/**
 * Permet d'obtenir un utilisateur
 */
module.exports.getInfoUser = (('/:idU'), async (req, res) => {
    pIdUtilisateur = req.params.idU;
    qr = "select * from utilisateur where idU = :idU";
    console.log('get users by id');

    sequelize.query(qr,{
        replacements: {idU : pIdUtilisateur},
        type:QueryTypes.SELECT
    }).then((userRes) => {
        transformPhotoBase64(userRes, res)
            .then(r => console.log('recuperer user'))
            .catch(error => {
                res.status(500).json({
                    message: error
                });
            });
    }).catch(error => {
        res.status(500).json({
            message: error
        });


    })
})
//Recuperer les infor des tous les utilisateur, ca serve pas pour la partie front
module.exports.getUser = (req, res, next) => {
    sequelize.query('SELECT * FROM utilisateur ', {
        type: QueryTypes.SELECT
    }).then((utilisateur) => res.status(201).json({
        utilisateur: utilisateur
    }).catch(error => {
        res.status(500).json({
            message: error
        });
    })
)};

/**
 * Permet de transformer une photo en base64
 * @param userRes
 * @param res
 * @returns {Promise<void>}
 */
async function transformPhotoBase64(userRes, res) {
    const fs = require('fs').promises;
    for (const element of userRes) {
        element.photoU = await fs.readFile(process.cwd() + '/' + element.photoU, {encoding: 'base64'});
    res.status(200).json(
        {
            utilisateur : userRes

        }
    )
}}








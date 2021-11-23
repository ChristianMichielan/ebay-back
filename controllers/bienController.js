const { QueryTypes } = require('sequelize');
const { model } = require('../bdd/connect');
var sequelize = require('../bdd/connect');
var initModels = require('../models/init-models');
var models = initModels(sequelize);

module.exports.getBiens = (req, res, next) => {
    sequelize.query('SELECT bien.*, MAX(prix) as prixEnchereCourante' +
        ' FROM bien' +
        ' LEFT JOIN encherir ON bien.idB = encherir.BIENidB \n' +
        " WHERE etatB = 'en_cours'" +
        " GROUP BY bien.idB", {
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

module.exports.getUnBien = (req, res, next) => {
    pIdBien = req.params.idBien;
    sequelize.query('SELECT B.idB, B.nomB, B.descriptionB, B.photoB, B.etatB, B.prixPlancherB, MAX(E1.prix) as prixEnchereCourante\n' +
        'FROM Bien B\n' +
        'LEFT JOIN encherir E1 ON B.idB = E1.BIENidB \n' +
        'WHERE B.idB = :idB\n' , {
        type: QueryTypes.SELECT,
        replacements: { idB: pIdBien },
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
 * url : http://localhost:3000/utilisateur/:idUtilisateur/bien
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
        transformPhotoBase64(bienRes, res)
            .then(r => console.log('getBiensVendus - envoi réussi'))
            .catch(error => {
                res.status(500).json({
                    message: error
                });
            });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: error
        });
    });
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
    });
};

/**
 * Retourne les enchères en cours pour un utilisateur (enchère sur lesquelles il a réalisé une enchère
 * @param req
 * @param res
 * @param next
 */
module.exports.getEncheresEnCours = (req, res, next) => {
    pIdUtilisateur = parseInt(req.params.idUtilisateur);
    var sqlQuery = "SELECT B.idB, B.nomB, B.descriptionB, B.photoB, B.etatB, E1.prix, B.dateCreationB FROM Encherir E1, Bien B WHERE E1.BIENidB = B.idB AND E1.UTILISATEURidU = :idUtilisateur AND B.etatB = 'en_cours' AND E1.prix = (SELECT MAX(E2.prix) FROM Encherir E2 WHERE E2.BIENidB = E1.BIENidB AND E2.UTILISATEURidU = E1.UTILISATEURidU)";
    sequelize.query(sqlQuery, {
        replacements: { idUtilisateur: pIdUtilisateur },
        type: QueryTypes.SELECT
    }).then(bienRes => {
        transformPhotoBase64(bienRes, res)
            .then(r => console.log('getEncheresEnCours - envoi réussi'))
            .catch(error => {
                res.status(500).json({
                    message: error
                });
            });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: error
        });
    });
}

/**
 * Retourne les biens achetés par l'utilisateur et qui sont livrés ou en attente de livraison
 * @param req
 * @param res
 * @param next
 */
module.exports.getLivraisons = (req, res, next) => {
    pIdUtilisateur = parseInt(req.params.idUtilisateur);
    var sqlQuery = "SELECT B.idB, B.nomB, B.descriptionB, B.photoB, B.etatB, L.dateL FROM Livraison L, Bien B WHERE B.idB = L.BIENidB AND B.etatB = 'livre' AND L.UTILISATEURidU = :idUtilisateur";
    sequelize.query(sqlQuery, {
        replacements: { idUtilisateur: pIdUtilisateur },
        type: QueryTypes.SELECT
    }).then(bienRes => {
        transformPhotoBase64(bienRes, res)
            .then(r => console.log('getLivraisons - envoi réussi'))
            .catch(error => {
                res.status(500).json({
                    message: error
                });
            });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: error
        });
    });
}



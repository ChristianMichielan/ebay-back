const { QueryTypes } = require('sequelize');
const { model } = require('../bdd/connect');
var sequelize = require('../bdd/connect');
var initModels = require('../models/init-models');
var models = initModels(sequelize);
const jwt = require('jsonwebtoken');
const utilisateur = require('../models/utilisateur');
const config = require('../config');

// module.exports.connecter = (req, res, next) => {
//     let pseudo = req.body.pseudoU;
//     let motDePasse = req.body.motDePasseU;
//     models.utilisateur.findOne({
//         where: {
//             pseudoU: pseudo,
//             motDePasseU: motDePasse
//         }
//     }).then(utilisateur => {
//         console.log(utilisateur);
//         return res.status(201).json({
//             idU: utilisateur.idU,
//             pseudoU: utilisateur.pseudoU
//         });
//     }).catch(error => {
//         console.log(error);
//         return res.status(401).json(
//             { message: "Erreur d'authentification" }
//         )
//     })
// };

    module.exports.connecter = (req, res, next) =>{
            models.utilisateur.findOne({
                where:{ pseudoU: req.body.pseudoU}
            }).then( utilisateur => {
                //Ne pas trouver l'utilisateur par pseudoU
                if(!utilisateur){
                    return res.status(500).json({
                        success: false,
                        message: "The user not found"
                    });
                }
                //verifier le mot de passe de l'utilisateur trouvé
                if (utilisateur&& req.body.motDePasseU == utilisateur.motDePasseU){
                    const token = jwt.sign({

                        pseudoU : utilisateur.pseudoU
    
                    }, config.SECRET,{expiresIn: '300s'})

                    return res.status(201).json({
                        success: true,
                        idU: utilisateur.idU,
                        pseudoU: utilisateur.pseudoU,
                        token : token

                    });
                }else{
                    return res.status(400).json({
                        suceess: false,
                        message: "Mot de passe incorret"
                    });
                }
            }).catch(error => {
                console.log(error);
                    return res.status(401).json(
                        { message: "Erreur d'authentification" }
                    )
            })
    }
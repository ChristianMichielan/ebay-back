var DataTypes = require("sequelize").DataTypes;
var _bien = require("./bien");
var _encherir = require("./encherir");
var _livraison = require("./livraison");
var _utilisateur = require("./utilisateur");

function initModels(sequelize) {
  var bien = _bien(sequelize, DataTypes);
  var encherir = _encherir(sequelize, DataTypes);
  var livraison = _livraison(sequelize, DataTypes);
  var utilisateur = _utilisateur(sequelize, DataTypes);

  bien.belongsToMany(utilisateur, { as: 'UTILISATEURidU_utilisateurs', through: encherir, foreignKey: "BIENidB", otherKey: "UTILISATEURidU" });
  utilisateur.belongsToMany(bien, { as: 'BIENidB_biens', through: encherir, foreignKey: "UTILISATEURidU", otherKey: "BIENidB" });
  encherir.belongsTo(bien, { as: "BIENidB_bien", foreignKey: "BIENidB"});
  bien.hasMany(encherir, { as: "encherirs", foreignKey: "BIENidB"});
  livraison.belongsTo(bien, { as: "BIENidB_bien", foreignKey: "BIENidB"});
  bien.hasOne(livraison, { as: "livraison", foreignKey: "BIENidB"});
  bien.belongsTo(utilisateur, { as: "UTILISATEURidU_utilisateur", foreignKey: "UTILISATEURidU"});
  utilisateur.hasMany(bien, { as: "biens", foreignKey: "UTILISATEURidU"});
  encherir.belongsTo(utilisateur, { as: "UTILISATEURidU_utilisateur", foreignKey: "UTILISATEURidU"});
  utilisateur.hasMany(encherir, { as: "encherirs", foreignKey: "UTILISATEURidU"});
  livraison.belongsTo(utilisateur, { as: "UTILISATEURidU_utilisateur", foreignKey: "UTILISATEURidU"});
  utilisateur.hasMany(livraison, { as: "livraisons", foreignKey: "UTILISATEURidU"});

  return {
    bien,
    encherir,
    livraison,
    utilisateur,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilisateur', {
    idU: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomU: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    prenomU: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    mailU: {
      type: DataTypes.STRING(80),
      allowNull: true,
      unique: "mail"
    },
    pseudoU: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "pseudo"
    },
    motDePasseU: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    photoU: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    geolocalisationLatU: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: true
    },
    geolocalisationLongU: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: true
    },
    adresseU: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'utilisateur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idU" },
        ]
      },
      {
        name: "mail",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mailU" },
        ]
      },
      {
        name: "pseudo",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pseudoU" },
        ]
      },
    ]
  });
};

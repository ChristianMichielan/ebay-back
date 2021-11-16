const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('encherir', {
    UTILISATEURidU: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilisateur',
        key: 'idU'
      }
    },
    BIENidB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'bien',
        key: 'idB'
      }
    },
    prix: {
      type: DataTypes.FLOAT,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'encherir',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UTILISATEURidU" },
          { name: "BIENidB" },
          { name: "prix" },
        ]
      },
      {
        name: "fk_encherir_bien",
        using: "BTREE",
        fields: [
          { name: "BIENidB" },
        ]
      },
    ]
  });
};

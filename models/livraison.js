const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('livraison', {
    BIENidB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'bien',
        key: 'idB'
      }
    },
    UTILISATEURidU: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'utilisateur',
        key: 'idU'
      }
    },
    idL: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dateL: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'livraison',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "BIENidB" },
        ]
      },
      {
        name: "fk_livraison_utilisateur",
        using: "BTREE",
        fields: [
          { name: "UTILISATEURidU" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bien', {
    idB: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomB: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    descriptionB: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prixPlancherB: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    dateCreationB: {
      type: DataTypes.DATE,
      allowNull: true
    },
    photoB: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    etatB: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    UTILISATEURidU: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'utilisateur',
        key: 'idU'
      }
    }
  }, {
    sequelize,
    tableName: 'bien',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idB" },
        ]
      },
      {
        name: "fk_bien_utilisateur",
        using: "BTREE",
        fields: [
          { name: "UTILISATEURidU" },
        ]
      },
    ]
  });
};

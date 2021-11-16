const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("ebay", "root", "root", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;

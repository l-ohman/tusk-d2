const Sequelize = require("sequelize");

console.log("Connecting to database...");
const db = new Sequelize("postgres://localhost/tusk_d2", { logging: false });

module.exports = db;

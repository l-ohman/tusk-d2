// Database model for teams
const Sequelize = require("sequelize");
const db = require("../database");

const Team = db.define(
  "Team",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    logo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { timestamps: false }
);

module.exports = { Team };

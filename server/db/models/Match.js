// Database model for matches
const Sequelize = require("sequelize");
const db = require("../database");

const Match = db.define(
  "Matches",
  {
    // Match ID
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = { Match };

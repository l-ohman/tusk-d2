// Database model for TI heroes
const Sequelize = require("sequelize");
const db = require("../database");

const TIHero = db.define(
  "TI_Heroes",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    winrate: {
      type: Sequelize.DECIMAL,
    },
    matchCount: {
      type: Sequelize.INTEGER,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = { TIHero };

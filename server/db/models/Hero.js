// Database model for heroes
const Sequelize = require("sequelize");
const db = require("../database");

const HeroMatchups = db.define(
  "hero_matchup",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    baseWinrate: {
      type: Sequelize.DECIMAL,
    },
    // Using JSON like this is not ideal but will suffice until I can figure out self many-to-many relations
    with: {
      type: Sequelize.JSON,
    },
    vs: {
      type: Sequelize.JSON,
    },
  },
  { timestamps: false }
);

module.exports = { HeroMatchups };

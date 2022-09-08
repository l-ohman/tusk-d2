// Database model for heroes
const Sequelize = require("sequelize");
const db = require("../database");

// This table excludes the relationships (for ease of use);
const Hero = db.define(
  "hero",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

const HeroMatchups = db.define(
  "hero_matchups",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    winrate: {
      type: Sequelize.DECIMAL,
    },
    // Using JSON like this is not ideal but will suffice until I can figure out self many-to-many relations
    withMatchups: {
      type: Sequelize.JSON,
    },
    againstMatchups: {
      type: Sequelize.JSON,
    },
  },
  { timestamps: false }
);

module.exports = { Hero, HeroMatchups };

// Database model for TI heroes
const Sequelize = require("sequelize");
const db = require("../database");

const TIHero = db.define(
  "ti_heroes",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    winCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    matchCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    banCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    winrate: {
      type: Sequelize.VIRTUAL,
      get() {
        if (!this.matchCount) return "0.00";
        return (this.winCount / this.matchCount).toFixed(2);
      },
      set() {
        throw new Error("Cannot manually set 'winrate'");
      },
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = { TIHero };

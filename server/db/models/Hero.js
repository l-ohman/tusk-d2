// Database model for heroes
const Sequelize = require("sequelize");
const db = require("../database");

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

// const HeroMatchups = db.define(
//   "hero_matchup",
//   {
//     withCount: {
//       type: Sequelize.NUMBER,
//     },
//     withRate: {
//       type: Sequelize.DECIMAL,
//     },
//     againstCount: {
//       type: Sequelize.NUMBER,
//     },
//     againstRate: {
//       type: Sequelize.DECIMAL,
//     },
//   },
//   { timestamps: false }
// );
// Hero.belongsToMany(Hero, { through: HeroMatchups, as: "Hero2" });

module.exports = { Hero };

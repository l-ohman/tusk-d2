// Database model for matches
const Sequelize = require("sequelize");
const db = require("../database");

const laneOutcome = Sequelize.ENUM(
  "RADIANT_VICTORY",
  "DIRE_VICTORY",
  "TIE",
  "RADIANT_STOMP",
  "DIRE_STOMP"
);

const Match = db.define(
  "matches",
  {
    // Match ID (using string for larger ints)
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    startDateTime: {
      type: Sequelize.INTEGER,
    },
    durationSeconds: {
      type: Sequelize.INTEGER,
    },
    didRadiantWin: {
      type: Sequelize.BOOLEAN,
    },
    topLaneOutcome: {
      type: laneOutcome,
    },
    midLaneOutcome: {
      type: laneOutcome,
    },
    bottomLaneOutcome: {
      type: laneOutcome,
    },
    // the type of teams is JSON, but it will be the "Team" class defined below
    radiantTeam: {
      type: Sequelize.JSON,
    },
    direTeam: {
      type: Sequelize.JSON,
    },
    pickBans: {
      // im just going to be lazy for now and slap this in here
      // surely ill fix it eventually
      type: Sequelize.JSON,
    },
  },
  { timestamps: false, freezeTableName: true }
);

class Team {
  constructor(id, name, logo) {
    this.id = id;
    this.name = name;
    this.logo = logo;
  }
}

module.exports = { Match, Team };

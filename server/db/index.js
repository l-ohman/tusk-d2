"use strict";

const db = require("./database");
const { Hero, HeroMatchups } = require("./models/Hero");
const Match = require("./models/Match");
const Team = require("./models/Team");

// Should define relations here once Team is built and hero winrates are added

module.exports = {
  db,
  Hero,
  HeroMatchups,
};

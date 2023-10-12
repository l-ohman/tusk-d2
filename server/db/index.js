"use strict";

const db = require("./database");
const { HeroMatchups } = require("./models/Hero");
const { Match } = require("./models/Match");
const { TIHero } = require("./models/TIHero");

// Associations here

module.exports = {
  db,
  HeroMatchups,
  Match,
  TIHero,
};

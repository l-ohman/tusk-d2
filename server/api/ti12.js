const router = require("express").Router();
const { Match, TIHero } = require("../db");

// Get all heroes
router.get("/heroes", async (req, res, next) => {
  try {
    const heroes = await TIHero.findAll();
    console.log(heroes);
    res.send(heroes);
  } catch (error) {
    next(error);
  }
});

// Get all matches
router.get("/matches", async (req, res, next) => {
  try {
    const matches = await Match.findAll();
    res.send(matches);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;

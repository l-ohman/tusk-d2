const router = require("express").Router();
const { Hero, HeroMatchups } = require("../db");

// Gets all heroes with name+id (mostly for reference)
router.get("/heroes", async (req, res, next) => {
  try {
    const data = await Hero.findAll();
    res.send(data);
  } catch (error) {
    res.send(error.message);
    next(error);
  }
});

// All matchups for a hero
router.get("/heroes/:id", async (req, res, next) => {
  try {
    const data = await HeroMatchups.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    res.send(error.message);
    next(error);
  }
});

router.use((req, res, next) => {
  const err = new Error("404 API route not found");
  err.status = 404;
  next(err);
});

module.exports = router;

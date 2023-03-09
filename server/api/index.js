const router = require("express").Router();
const { HeroMatchups } = require("../db");
const heroes = require("../heroes.json")

// Gets all heroes with baseWinrate and primary stat (this probably won't be used for anything)
router.get("/heroes", async (req, res, next) => {
  try {
    let data = await HeroMatchups.findAll();
    data = data.map(hero => {
      return { id: hero.id, name: heroes[hero.id].name, winrate: +hero.baseWinrate, stat: heroes[hero.id].stat }
    }).sort((a, b) => {
      if (a.id < b.id) return -1;
      else return 0;
    });
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

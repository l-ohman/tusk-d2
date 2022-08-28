const router = require('express').Router();

const { db, Hero, Match, Team } = require('../db');

router.get('/heroes/', async (req, res, next) => {
    try {
        const data = await Hero.findAll()
        res.send(data);
    } catch (error) {
        res.send(error.message);
        next(error);
    }
})

router.get('/matches/', async (req, res, next) => {
    try {
        const data = await Match.findAll();
        res.send(data);
    } catch (error) {
        res.send(error.message);
        next(error);
    }
})

// router.post ?

router.use((req, res, next) => {
    const err = new Error(chalk.red("API route not found"));
    err.status = 404;
    next(err);
  });

module.exports = router;

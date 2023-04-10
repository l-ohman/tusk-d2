const { expect } = require("chai");
// const { Op } = require("sequelize");
const { db, HeroMatchups } = require("../server/db");

describe("Hero matchups", () => {
  let heroIds = {};

  it("Table has proper number of heroes", async () => {
    const heroes = await HeroMatchups.findAll({ attributes: ["id"] });
    heroes.forEach((hero) => (heroIds[hero.id] = hero.id));
    expect(heroes.length).to.equal(124);
  });

  it("Heroes have a synergy (difference) for all other heroes", async () => {
    const heroes = [2, 19, 136, 138]; // axe, tiny, marci, muerta
    for (let i = 0; i < heroes.length; i++) {
      const hero = await HeroMatchups.findByPk(heroes[i]);
      for (const matchupId in hero.with) {
        expect(hero.with[matchupId].difference).to.not.equal(0);
      }

      for (const heroId in heroIds) {
        const matchupCount = Object.keys(hero.with).length;
        expect(matchupCount).to.equal(
          123,
          `Incorrect number of synergy matchups for hero ${hero.id}
        (123 expected, ${matchupCount} found)`
        );

        // The following 'expect' allows identification of which heroId is missing from the matchups, but will never be reached unless the previous 'expect' is commented out
        expect(hero.with[heroId] === undefined && heroId != hero.id).to.equal(
          false,
          `Matchup for hero ${heroId} not found on matchups for hero ${hero.id}`
        );
      }
    }
  });

  it("Heroes have a counter (difference) for all other heroes", async () => {
    const heroes = [10, 95, 113, 138]; // morphling, wisp, arc warden, muerta
    for (let i = 0; i < heroes.length; i++) {
      const hero = await HeroMatchups.findByPk(heroes[i]);
      for (const matchupId in hero.vs) {
        expect(hero.vs[matchupId].difference).to.not.equal(0);
      }

      for (const heroId in heroIds) {
        const matchupCount = Object.keys(hero.vs).length;
        expect(matchupCount).to.equal(
          123,
          `Incorrect number of synergy matchups for hero ${hero.id}
        (123 expected, ${matchupCount} found)`
        );

        // The following 'expect' allows identification of which heroId is missing from the matchups, but will never be reached unless the previous 'expect' is commented out
        expect(hero.vs[heroId] === undefined && heroId != hero.id).to.equal(
          false,
          `Matchup for hero ${heroId} not found on matchups for hero ${hero.id}`
        );
      }
    }
  });
});

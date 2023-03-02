// winrates and matchups from Crusader to Immortal brackets (brackets 3-8)
const fetchStratz = require("./fetchStratz");
const { HeroMatchups } = require("../models/Hero");
const { createWinrateQuery, createMatchupQuery } = require("./queries");
const { heroes } = require("../../../dotaConstants");

// Utility functions //
const getHeroById = async (heroId) => {
  return await HeroMatchups.findOne({
    where: { id: heroId },
  });
};
const calculateWinrate = (win, total) => {
  if (isNaN(win) || isNaN(total)) {
    throw new Error("One entry in the winrate calculation is not a number");
  }
  return Number((win / total).toPrecision(5));
};

// Clears 'hero_matchups' table if it exists, creates a new table otherwise
const buildHeroTable = async () => {
  await HeroMatchups.sync({ force: true });
  for (let heroId in heroes) {
    await HeroMatchups.create({ id: heroId });
  }
  console.log("Base hero matchup table successfully built");
};

// Gets baseWinrate for all heroes for past (n) weeks (currently only handles 1)
const fetchAllHeroesWinrates = async (weekCount = 1) => {
  let { data } = await fetchStratz(createWinrateQuery(weekCount));
  data = data.heroStats.winWeek;

  for (let i = 0; i < data.length; i++) {
    const heroData = data[i];

    const hero = await getHeroById(heroData.heroId);
    const heroWinrate = calculateWinrate(
      heroData.winCount,
      heroData.matchCount
    );
    await hero.update({ baseWinrate: heroWinrate });
  }
  console.log("Base hero winrates successfully added to DB");
};

const restructureMatchupObject = (matchup, isCounter) => {
  id = matchup.heroId2;
  delete matchup.heroId2;

  matchup.winrate = Number(
    (matchup.winCount / matchup.matchCount).toPrecision(4)
  );
  delete matchup.winCount;

  if (isCounter) {
    matchup.difference = calculateCounter(
      matchup.winrate,
      matchup.winRateHeroId1,
      matchup.winRateHeroId2
    );
  } else {
    matchup.difference = calculateSynergy(
      matchup.winrate,
      matchup.winRateHeroId1,
      matchup.winRateHeroId2
    );
  }

  delete matchup.winRateHeroId1;
  delete matchup.winRateHeroId2;
  return [id, matchup];
};

function calculateCounter(observedWinrate, winrate1, winrate2) {
  return Number(
    ((observedWinrate - (0.5 + winrate1 - winrate2)) * 100).toPrecision(4)
  );
}
// i need a stratz dev to explain this to me
function calculateSynergy(observedWinrate, winrate1, winrate2) {
  return Number(
    (
      (observedWinrate - (-0.48 + (0.98 * winrate1) + (0.98 * winrate2))) *
      100
    ).toPrecision(4)
  );
}

// Gets matchups for a single hero
const updateSingleHeroMatchups = async (heroId) => {
  let { data } = await fetchStratz(createMatchupQuery(heroId));
  data = data.heroStats.matchUp[0];

  const withData = data.with;
  const againstData = data.vs;
  const withMatchups = {};
  const againstMatchups = {};

  withData.forEach((itm) => {
    const [id, matchup] = restructureMatchupObject(itm, false);
    withMatchups[id] = matchup;
  });
  againstData.forEach((itm) => {
    const [id, matchup] = restructureMatchupObject(itm, true);
    againstMatchups[id] = matchup;
  });

  const heroInDb = await getHeroById(data.heroId);
  await heroInDb.update({
    with: withMatchups,
    vs: againstMatchups,
  });
  console.log(
    `Matchups successfully added for hero ${data.heroId} (${
      heroes[data.heroId].name
    })`
  );
};

const fetchAllHeroesMatchups = async () => {
  for (const heroId in heroes) {
    await updateSingleHeroMatchups(heroId);
  }
  console.log("Successfully updated data for all heroes");
};

const updateAllData = async () => {
  await buildHeroTable();
  await fetchAllHeroesWinrates();
  await fetchAllHeroesMatchups();
};

if (require.main === module) {
  updateAllData();
}

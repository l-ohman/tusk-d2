// winrates and matchups from Crusader to Immortal brackets (brackets 3-8)
const fetchStratz = require("./fetchStratz");
const { HeroMatchups } = require("../models/Hero");
const { createWinrateQuery, createMatchupQuery } = require("./queries");
const heroes = require("../../heroes.json");

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
      (observedWinrate - (-0.48 + 0.98 * winrate1 + 0.98 * winrate2)) *
      100
    ).toPrecision(4)
  );
}

// Merge old/new data for a cell (such as id/with or id/against)
const mergePastPresentData = (existingData, newData) => {
  for (let heroId in existingData) {
    if (!Object.keys(newData).includes(heroId)) continue;

    const oldMatchup = existingData[heroId];
    const newMatchup = newData[heroId];
    const totalMatches = oldMatchup.matchCount + newMatchup.matchCount;

    const newWeight = newMatchup.matchCount / totalMatches;
    const oldWeight = 1 - newWeight;

    const adjustedWinrate =
      oldMatchup.winrate * oldWeight + newMatchup.winrate * newWeight;
    const adjustedDifference =
      oldMatchup.difference * oldWeight + newMatchup.difference * newWeight;

    newMatchup.matchCount = totalMatches;
    newMatchup.winrate = adjustedWinrate;
    newMatchup.difference = adjustedDifference;
  }
};

// Gets matchups for a single hero
const updateSingleHeroMatchups = async (heroId) => {
  let { data } = await fetchStratz(createMatchupQuery(heroId));
  data = data.heroStats.matchUp[0];

  let withData;
  let againstData;
  const withMatchups = {};
  const againstMatchups = {};

  // ???
  try {
    withData = data.with;
    againstData = data.vs;
  } catch (error) {
    console.error(error, "\n");
    console.log(data);
  }

  withData.forEach((itm) => {
    const [id, matchup] = restructureMatchupObject(itm, false);
    withMatchups[id] = matchup;
  });
  againstData.forEach((itm) => {
    const [id, matchup] = restructureMatchupObject(itm, true);
    againstMatchups[id] = matchup;
  });

  const heroInDb = await getHeroById(data.heroId);
  mergePastPresentData(heroInDb.with, withMatchups);
  mergePastPresentData(heroInDb.vs, againstMatchups);

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
  // todo1: separate functionality for initializing/adding data (should detect automatically)(+ test this)
  // await buildHeroTable();

  // todo2: fix method of calculating/storing overall winrate (currently does not support proper updates)
  // await fetchAllHeroesWinrates();

  // todo3: see todo1. write tests for this functionality (and implement better db backup system?).
  await fetchAllHeroesMatchups();
};

if (require.main === module) {
  updateAllData();
}

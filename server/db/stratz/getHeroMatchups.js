// Base winrates are from only Divine/Immortal bracket, and matchups are from Crusader-Immortal brackets
const fetchStratz = require("./fetchStratz");
const { HeroMatchups } = require("../models/Hero");
const { createWinrateQuery, createMatchupQuery } = require("./queries");
const { heroes } = require("../../../dotaConstants");

// Utility functions
const getHeroInDataBase = async (heroId) => {
  return await HeroMatchups.findOne({
    where: { id: heroId },
  });
};
const calculateWinrate = (win, total) => {
  if (isNaN(win) || isNaN(total)) {
    throw new Error("One entry in the winrate calculation is not a number");
  }
  return Number(((win / total) * 100).toPrecision(4));
};
const roundToTwoDecimals = (num) => {
  return ((Math.round(Number(num) * 100)) / 100)
}

// Clears 'hero_matchups' table if it exists, creates a new table otherwise
const buildHeroTable = async () => {
  await HeroMatchups.sync({ force: true });
  for (let heroId in heroes) {
    await HeroMatchups.create({ id: heroId });
  }
  console.log("Base hero matchup table successfully built");
};

// Gets baseWinrate for all heroes for past (n) weeks (currently only handles 1)
const addAllHeroesWinrates = async (weekCount = 1) => {
  let { data } = await fetchStratz(createWinrateQuery(weekCount));
  data = data.heroStats.winWeek;

  for (let i = 0; i < data.length; i++) {
    const heroData = data[i];

    const hero = await getHeroInDataBase(heroData.heroId);
    const heroWinrate = calculateWinrate(
      heroData.winCount,
      heroData.matchCount
    );
    await hero.update({ baseWinrate: heroWinrate });
  }
  console.log("Base hero winrates successfully added to DB");
};

const restructureMatchupObject = (matchup) => {
  // Change 'heroId2' to 'id'
  matchup.id = matchup.heroId2;
  delete matchup.heroId2;

  // Convert 'matchCount' and 'winCount' to winrate
  matchup.winrate = calculateWinrate(matchup.winCount, matchup.matchCount);
  delete matchup.winCount;

  // Use both heroes' winrates to calculate 'difference'
  let avgWinrate = (matchup.winRateHeroId1 + matchup.winRateHeroId2) * 50;
  matchup.difference = roundToTwoDecimals(matchup.winrate - avgWinrate);

  delete matchup.winRateHeroId1;
  delete matchup.winRateHeroId2;

  return matchup;
};

// Gets matchups for a single hero
const updateSingleHeroMatchups = async (heroId) => {
  let { data } = await fetchStratz(createMatchupQuery(heroId));
  data = data.heroStats.matchUp[0];

  let withData = data.with;
  let againstData = data.vs;

  withData = withData.map((matchup) => {
    return restructureMatchupObject(matchup);
  });
  againstData = againstData.map((matchup) => {
    return restructureMatchupObject(matchup);
  });

  const heroInDb = await getHeroInDataBase(data.heroId);
  await heroInDb.update({
    with: withData,
    vs: againstData,
  });
  console.log(`Matchups successfully added for hero ${data.heroId} (${heroes[data.heroId].name})`);
};

const addAllHeroesMatchups = async () => {
  for (let heroId in heroes) {
    await updateSingleHeroMatchups(heroId);
  }
  console.log("Successfully updated data for all heroes");
};

const updateAllData = async () => {
  await buildHeroTable();
  await addAllHeroesWinrates();
  await addAllHeroesMatchups();
};

if (require.main === module) {
  updateAllData();
}

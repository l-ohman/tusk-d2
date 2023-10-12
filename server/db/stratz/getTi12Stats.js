const fetchStratz = require("./fetchStratz");
const db = require("../database");
const { Match } = require("../models/Match");
const { TIHero } = require("../models/TIHero");
const { getAllTiMatchesQuery } = require("./queries");

// Clears Match/TIHero tables if they exists, creates a new table otherwise
const syncTables = async () => {
  await Match.sync({ force: true });
  await TIHero.sync({ force: true });
  console.log("Tables successfully cleared/created");
};

// currently only adding the latest 10 matches
// todo: get ALL matches from the event
const fetchAllTiMatches = async () => {
  let { data } = await fetchStratz(getAllTiMatchesQuery());
  console.log("Fetched all matches from Stratz");
  return data.league.matches;
};

const addMatchesToDb = async (matches) => {
  for (let match of matches) {
    match.id = match.id.toString();
    await Match.create(match);
  }
  console.log(
    "Added all matches to Match table",
    `(${matches.length} matches)`
  );
};

const updateHeroesInDb = async (matches) => {
  for (let match of matches) {
    const heroes = match.pickBans;
    if (heroes === null) continue;
    for (let hero of heroes) {
      if (hero.heroId === null) continue;
      // Create the hero in the table if it does not exist yet
      let tiHero = await TIHero.findByPk(hero.heroId);
      if (tiHero === null) {
        tiHero = await TIHero.create({ id: hero.heroId });
      }

      // Handle if hero is banned
      if (!hero.isPick) {
        const updatedBans = tiHero.banCount + 1;
        await tiHero.update({ banCount: updatedBans });
      } else {
        // Update match count and win count
        const updatedMatchCount = tiHero.matchCount + 1;
        let updatedWinCount = tiHero.winCount || 0;
        const didHeroWin = hero.isRadiant === match.didRadiantWin;
        if (didHeroWin) updatedWinCount += 1;
        await tiHero.update({
          winCount: updatedWinCount,
          matchCount: updatedMatchCount,
        });
      }
      await tiHero.save();
    }
  }
  console.log("Added/updated all heroes in TIHero table");
};

const updateAllData = async () => {
  await syncTables();

  const matches = await fetchAllTiMatches();
  await addMatchesToDb(matches);
  await updateHeroesInDb(matches);

  console.log(`\nSuccessfully added matches/heroes to DB`);
  await db.close();
};

if (require.main === module) {
  updateAllData();
}

// For adding hero winrates to Hero table and matchups to HeroMatchups table
const fetchStratz = require("./fetchStratz");
const { Hero, HeroMatchups } = require("../models/Hero");

// temp constants
const gameVersions = [
  {
    id: 154,
    name: "7.32",
  },
  {
    id: 155,
    name: "7.32b",
  },
];

// Gets hero data based for n number of weeks, defaults to 1
const createWinrateQuery = (weekCount) => {
  return `query getHeroWinrates {
        heroStats {
            winWeek(groupBy: HERO_ID, bracketIds: [DIVINE, IMMORTAL], take: ${weekCount}) {
                heroId
                matchCount
                winCount
            }
        }
    }`;
};

// The arrays contained in this query are sorted from best to worst
const createMatchupQuery = (heroId) => {
  return `query getHeroMatchups {
        heroStats {
            heroVsHeroMatchup(heroId: ${heroId}) {
                advantage {
                    heroId
                    vs {
                        heroId2
                        matchCount
                        winCount
                    }
                    with {
                        heroId2
                        matchCount
                        winCount
                    }
                }
            }
        }
    }`;
};

const getHeroById = async (heroId) => {
  return await Hero.findOne({
    where: {
      id: heroId,
    },
  });
};
const calculateWinrate = (win, total) => {
  return ((win / total) * 100).toPrecision(5);
};

// Gets winrate for all heroes for past n weeks (currently can only handle 1)
const addAllHeroesWinrates = async (weekCount = 1) => {
  const response = await fetchStratz(createWinrateQuery(1));
  const allHeroData = response.data.heroStats.winWeek;

  for (let i = 0; i < allHeroData.length; i++) {
    const heroData = allHeroData[i];

    const hero = await getHeroById(heroData.heroId);
    const heroWinrate = (
      (heroData.winCount / heroData.matchCount) *
      100
    ).toPrecision(5);
    await hero.update({ winrate: heroWinrate });
  }
  console.log("Base hero winrates successfully added to DB");
};

// Gets winrate and matchups for a single hero
const updateSingleHeroData = async (heroId) => {
  const response = await fetchStratz(createMatchupQuery(heroId));
  const data = response.data.heroStats.heroVsHeroMatchup.advantage[0];
  // 'data' refers to an object containing 2 arrays, with keys 'vs' and 'with'
  const heroInDb = await getHeroById(heroId);
  console.log(`Writing matchup data for hero ${data.heroId}...`);

  let withData = data.with;
  let againstData = data.vs;
  // Adding winrates to each item in the arrays
  withData = withData.map((relation) => {
    relation.winrate = calculateWinrate(relation.winCount, relation.matchCount);
    return relation;
  });
  againstData = againstData.map((relation) => {
    relation.winrate = calculateWinrate(relation.winCount, relation.MatchCount);
    return relation;
  });

  // Hero table has 'withMatchups' and 'againstMatchups' for now
  await heroInDb.update({
    withMatchups: withData,
    againstMatchups: againstData,
  });
  console.log(`Matchups successfully added for hero ${data.heroId}`);
};

const addAllHeroesMatchups = async () => {
    const allHeroes = await Hero.findAll();
    for (let i = 0; i < allHeroes.length; i++) {
        let thisHero = allHeroes[i];
        await updateSingleHeroData(thisHero.id);
    }
    console.log('successfully updated data for all heroes.')
}

if (require.main === module) {
//   addAllHeroesWinrates();
    addAllHeroesMatchups(); // hardcoding test for 'drow ranger'
}

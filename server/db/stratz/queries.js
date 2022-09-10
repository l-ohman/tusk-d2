// Gets hero winrates from divine/immortal bracket for past week
const createWinrateQuery = (weekCount) => {
  return `query getHeroWinrates {
          heroStats {
              winWeek(bracketIds: [DIVINE, IMMORTAL], take: ${weekCount}) {
                  heroId
                  matchCount
                  winCount
              }
          }
      }`;
};

// Get matchups for every hero; must include lower brackets due to small sample size (less than 20 matches for some)
// Maybe this could be split into multiple queries later on - where if some heroes have less than a certain number of matches, it expands the data only for those heroes (so the heroes' data with higher match counts are not undermined by the heroes with lower match counts)
const createMatchupQuery = (heroId) => {
  return `query getHeroMatchups {
      heroStats {
        matchUp(heroId: ${heroId}, matchLimit: 0, take: 122, bracketBasicIds: [CRUSADER_ARCHON, LEGEND_ANCIENT, DIVINE_IMMORTAL]) {
          heroId
          vs {
            heroId2
            matchCount
            winCount
            winRateHeroId1
            winRateHeroId2
          }
          with {
            heroId2
            matchCount
            winCount
            winRateHeroId1
            winRateHeroId2
          }
        }
      }
    }`;
};

module.exports = { createWinrateQuery, createMatchupQuery };

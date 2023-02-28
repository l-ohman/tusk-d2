// builds matchupData array
const initMatchupData = (allHeroes) => {
    let matchupData = {}
    allHeroes.forEach(hero => {
        matchupData[hero.id] = {
            valueWith: 0,
            valueAgainst: 0,
        }
    })
    return matchupData;
}

// team as "radiant" or "dire"; heroData as matchups for 1 hero; matchupData contains a value for each hero
const addOneHeroMatchups = (team, heroData, matchupData) => {

    // let baseWinrate = +heroData.winrate;
    let againstMatchups = heroData.vs;
    let withMatchups = heroData.with;

    // if team is 'radiant' that means ally heroes; else it is 'dire', meaning enemy heroes
    if (team === "radiant") {
        withMatchups.forEach(matchup => {
            matchupData[matchup.heroId2].valueWith += matchup.winrate;
        });
        againstMatchups.forEach(matchup => {
            matchupData[matchup.heroId2].valueAgainst += matchup.winrate;
        });
    } else {
        withMatchups.forEach(matchup => {
            matchupData[matchup.heroId2].valueAgainst += matchup.winrate;
        });
        againstMatchups.forEach(matchup => {
            matchupData[matchup.heroId2].valueWith += matchup.winrate;
        });
    }
    // Need to find a way to account for heroes that do not have matchup data with/against the hero in question - maybe just add their base winrate and console.log "no matchup for {x} pair"
    return matchupData;
}

// allHeroData containing all heroe data from store, selectedHeroes is teamsObj from store
export const buildMatchupData = (allHeroes, allHeroData, selectedHeroes) => {
    console.log("Building matchup data...")

    let matchupData = initMatchupData(allHeroes);

    selectedHeroes.radiant.forEach(hero => {
        console.log(`Adding matchup data for ${hero.name}`);
        const thisHeroData = allHeroData[hero.id];
        addOneHeroMatchups('radiant', thisHeroData, matchupData);
    })
    selectedHeroes.dire.forEach(hero => {
        console.log(`Adding matchup data for ${hero.name}`);
        const thisHeroData = allHeroData[hero.id];
        addOneHeroMatchups('dire', thisHeroData, matchupData);
    })

    return matchupData;
}

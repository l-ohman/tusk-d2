// builds matchupData array
const initMatchupData = (allHeroes) => {
    let matchupData = {}
    allHeroes.forEach(hero => {
        matchupData[hero.id] = {
            winrateWith: 0,
            winrateAgainst: 0,
        }
    })
    return matchupData;
}

// team as "radiant" or "dire"; heroData as matchups for 1 hero; matchupData contains a value for each hero
const addOneHeroMatchups = (heroData, matchupData, isRadiant) => {
    // let baseWinrate = +heroData.winrate;
    const againstMatchups = heroData.vs;
    const withMatchups = heroData.with;

    if (isRadiant) {
        Object.keys(withMatchups).forEach(heroId => {
            matchupData[heroId].winrateWith += withMatchups[heroId].winrate;
        });
        Object.keys(againstMatchups).forEach(heroId => {
            matchupData[heroId].winrateAgainst += againstMatchups[heroId].winrate;
        });
    } else {
        Object.keys(withMatchups).forEach(heroId => {
            matchupData[heroId].winrateWith += withMatchups[heroId].winrate;
        });
        Object.keys(againstMatchups).forEach(heroId => {
            matchupData[heroId].winrateAgainst += againstMatchups[heroId].winrate;
        });
    }
    // Need to find a way to account for heroes that do not have matchup data with/against the hero in question - maybe just add their base winrate and console.log "no matchup for {x} pair"
    return matchupData;
}

// allHeroData containing all heroe data from store, selectedHeroes is teamsObj from store
export const buildMatchupData = (allHeroes, allHeroData, selectedHeroes) => {
    // console.log("Building matchup data...")

    let matchupData = initMatchupData(allHeroes);

    selectedHeroes.radiant.forEach(hero => {
        // console.log(`Adding matchup data for ${hero.name}`);
        const thisHeroData = allHeroData[hero.id];
        addOneHeroMatchups(thisHeroData, matchupData, true);
    })
    selectedHeroes.dire.forEach(hero => {
        // console.log(`Adding matchup data for ${hero.name}`);
        const thisHeroData = allHeroData[hero.id];
        addOneHeroMatchups(thisHeroData, matchupData, false);
    })

    return matchupData;
}

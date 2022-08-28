// Calls Stratz API
// id: 14417,
// name: 'PGL Arlington 2022'

const fetchStratz = require('../fetchStratz');

// can only get 100 matches at a time
const createQuery = (leagueId, skip = 0, take = 100) => {
    return `query getTournamentMatches {
        league(id: ${leagueId}) {
            stats {
                matchCount
            }
            matches(request: {skip: ${skip}, take: ${take}}) {
                id
                didRadiantWin
                direTeam {
                    id
                    name
                }
                radiantTeam {
                    id
                    name
                }
                durationSeconds
                stats {
                    pickBans {
                        heroId
                        isRadiant
                        order
                    }
                }
            }
        }
    }`
}

// pickBans arrays are only valid for 10 matches, then null for 10 more matches ...
// I am assuming Stratz has a (hidden) limit on the amount of matches that can be queried at once
let take = 10;

const getMatchesFromLeague = async (leagueId) => {
    console.log('Getting some matches...')
    let response = await fetchStratz(createQuery(leagueId, 0, take));

    let allMatches = response.data.league.matches;

    // Will use 'matchCount' to determine how many queries to make depending on length of tournament (in # of games)
    const queriesRemaining = Math.ceil(response.data.league.stats.matchCount / take) - 1;
    console.log('Total queries to make: ', queriesRemaining + 1);
    
    for (let i = 0; i < queriesRemaining; i++) {
        let matchesToSkip = (i + 1) * take;

        let response = await fetchStratz(createQuery(leagueId, matchesToSkip, take));

        allMatches.push(...response.data.league.matches);

        // Hard coding a limit due to previous calls returning 2k+ matches ... (despite the max matchCount per query being 100)
        if (allMatches.length > 180) {
            console.log(`Number of matches exceeded expected value. Stopping...`)
            break;
        }
    }

    console.log(`Total number of matches: ${allMatches.length}`)
    return allMatches;
}

module.exports = getMatchesFromLeague;

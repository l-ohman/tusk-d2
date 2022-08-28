const fetchStratz = require("../fetchStratz");

// Technically can get 100 matches per query, but there is an error with the reponse - the "pickBans" field sometimes returns null (consistently alternates between 10 valid drafts and 10 null drafts)
// The current (hopefully temporary) workaround is to take only 10 matches at a time
const createQuery = (leagueId, skip = 0, take = 10) => {
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
    }`;
};

// Stratz seems to have a (hidden) limit on the amount of matches that can be queried at once

const getMatchesFromLeague = async (leagueId) => {
  console.log("Getting some matches...");
  let response = await fetchStratz(createQuery(leagueId, 0, take));

  let allMatches = response.data.league.matches;

  // Will use 'matchCount' to determine how many queries to make depending on length of tournament (in # of games)
  const queriesRemaining =
    Math.ceil(response.data.league.stats.matchCount / take) - 1;
  console.log("Total queries to make: ", queriesRemaining + 1);

  for (let i = 0; i < queriesRemaining; i++) {
    let matchesToSkip = (i + 1) * take;

    let response = await fetchStratz(
      createQuery(leagueId, matchesToSkip, take)
    );

    allMatches.push(...response.data.league.matches);
  }

  console.log(`Total number of matches: ${allMatches.length}`);
  return allMatches;
};

module.exports = getMatchesFromLeague;

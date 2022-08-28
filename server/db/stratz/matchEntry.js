// Creates query for Stratz API based on specified league ID, then adds those matches to 'Match' table
const Sequelize = require('sequelize');
const db = require('./db');
const Match = require('./models/Match');
const getMatchesFromLeague = require('../api/queries/queryMatchesByLeague');

const league = { // For testing purposes
    id: 14417,
    name: 'PGL Arlington 2022',
    patch: '7.31d'
}

const addMatches = async (leagueId, inputPatch) => { // patch is a string, such as '7.31d' or '7.00'
    
    const allMatches = await getMatchesFromLeague(leagueId);
    // console.log('ALL MATCHES DATA: \n', allMatches, '\n');

    // To overwrite any existing data in DB (this also deletes the 1-24 columns)
    // await Match.sync({ force: true });

    // this method almost works - but the key in the object is converted to a string. so i will have to find another way.
    const pickBansToAttributes = (matchObject, pickBans) => { 
        return pickBans.reduce((match, pick) => {
            // Assigns match.Npick to the heroId
            match[`${pick.order + 1}pick`] = pick.heroId;
            return match;
        }, matchObject)
    }

    for (let i = 0; i < allMatches.length; i++) {
        // console.log(`Attempting to add match ${allMatches[i].id}...`)
        try {

            if (!allMatches[i].stats.pickBans) {
                console.log("'null' pickBans detected. match id: ", allMatches[i].id);
                continue;
            }

            let winner = allMatches[i].didRadiantWin ? 'radiant' : 'dire';
            let teamWithFirstPick = allMatches[i].stats.pickBans[0].isRadiant ? 'radiant' : 'dire';

            // Creating custom object to put row in DB - probably should make a factory function for this
            // A factory function might also allow the current DB structure to work ...
            let matchObject = {
                matchId: allMatches[i].id.toString(),
                patch: inputPatch,
                winningTeam: winner,
                duration: allMatches[i].durationSeconds,
                firstPick: teamWithFirstPick
            }

            matchObject = pickBansToAttributes(matchObject, allMatches[i].stats.pickBans);
            await Match.create(matchObject);

        } catch (error) {
            console.log(`${allMatches[i].id} not added. Error: ${error.message}`);
            continue;
        }

    }
}

// See 'npm run addMatches'
if (require.main === module) {
    addMatches(league.id, league.patch);
}

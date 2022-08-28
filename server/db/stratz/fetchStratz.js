// Gets key depending on whether app is running locally or on heroku
const fetch = require('isomorphic-fetch');
const key = process.env.stratzKey ? process.env.stratzKey : require('./key.js');

const chalk = require('chalk');
const sleep = ms => new Promise(res => setTimeout(res, ms));

const fetchStratz = async (userQuery) => {
    let response = await fetch('https://api.stratz.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({ query: userQuery }),
    })
    response = await response.json();
    
    // Self rate-limiting because fields were consistently being returned as 'null' 
    console.log(chalk.blue('Sleeping 500ms between API calls... 💤'));
    await sleep(500);

    return response;
}

module.exports = fetchStratz;

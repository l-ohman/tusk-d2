const fetch = require("isomorphic-fetch");
require('dotenv').config();

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const fetchStratz = async (userQuery) => {
  let response = await fetch("https://api.stratz.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({ query: userQuery }),
  });
  response = await response.json();
 
  // Self rate-limiting because fields were consistently being returned as 'null'
  await sleep(100);

  return response;
};

module.exports = fetchStratz;

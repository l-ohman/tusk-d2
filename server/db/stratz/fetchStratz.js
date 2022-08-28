const fetch = require("isomorphic-fetch");
const key = require("./key.js");

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const fetchStratz = async (userQuery) => {
  let response = await fetch("https://api.stratz.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ query: userQuery }),
  });
  response = await response.json();

  // Self rate-limiting because fields were consistently being returned as 'null'
  console.log("Sleeping 500ms between API calls... 💤");
  await sleep(501);

  return response;
};

module.exports = fetchStratz;

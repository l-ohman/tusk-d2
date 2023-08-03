# Tusk — Dota 2 Hero Matchup Analysis (WIP)

A simple tool to analyze complex hero matchups in Dota 2. Allows users to pick and ban heroes for either team and view detailed information about the matchups.

![tusk-01](https://github.com/l-ohman/tusk-d2/assets/101072281/da90b65a-b14e-4142-ae16-1075f3232491)

![tusk-03](https://github.com/l-ohman/tusk-d2/assets/101072281/4b1aa469-425e-45ce-b22b-b85ce7218827)

_Note: The names of the teams are arbitrary, and could easily be "Team A" and "Team B"—the separate "Radiant" and "Dire" winrates for each hero are not factored in these calculations._

## Technologies used

- React - frontend library
- Redux Toolkit - state management + API calls
- Express - framework for RESTful APIs with Node.js
- Postgres - SQL database management system
- Less - dynamic style sheet language
- Webpack - module bundler

## Local setup

- Clone repository and run `npm install` in root
- Create postgres database titled `tusk_d2`
- Create `.env` file in root containing your Stratz key `API_KEY="YOUR_API_KEY"`
- Run `npm run fetch-hero-matchups` (getting the data for all 124 heroes can take awhile, but it logs its progress to the console)
- Run `npm start` to run the app on localhost:3000

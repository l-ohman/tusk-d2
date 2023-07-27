# Tusk — Dota 2 Hero Matchup Analysis

Dota 2 hero+draft analysis/querying tools (WIP)

## Local setup

- Clone repository and run `npm install` in root
- Create postgres database titled `tusk_d2`
- Create `.env` file in root containing your Stratz key `API_KEY="YOUR_API_KEY"`
- Run `npm run fetch-hero-matchups` (this can take awhile, but it logs to the console as it progresses)
- Run `npm start` to run app on localhost:3000

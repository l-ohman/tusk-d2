## Tusk
Dota 2 hero+draft analysis/querying tools (WIP)

---
Setup
* `npm install`
* Create postgres db titled "tusk_d2" (`createdb tusk_d2`)
* Create .env file to place your Stratz API key in: `KEY=your-api-key-here`
* `npm run buildHeroStats` will build 2 tables:
    * heros - Contains every hero with their in-game id and name
    * hero_matchups - Contains each hero's winrate for the past week (to 5 significant figures) as well as JSON objects with all of their matchups (their relationship to every other hero)

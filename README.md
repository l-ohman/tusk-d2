## Tusk
Dota 2 hero+draft analysis/querying tools (WIP)

---
Setup
* `npm install`
* Create postgres db titled "tusk_d2" (`createdb tusk_d2`)
* Create .env file to place your Stratz API key in: `KEY=your-api-key-here`

To setup base hero table (ids and names only - winrate column empty)
* `npm run buildBaseHeroTable`
To updates winrates in the hero table (data is from past week)
* `npm run updateHeroWinrates`

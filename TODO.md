## General
- [ ] Hero winrate analysis
    - [ ] Ability to estimate winrate based on draft
    - [ ] A tool to suggest picks/bans at different points within the draft
    - [ ] In general, easier methods of getting matchup data
- [ ] Draft queries
    - [ ] Ability to search for pro matches by draft

## Backend
<details>
- [x] Setup Hero table(s)
    - [x] Include base hero winrate, and relationship table between heroes 
    - [x] Include winrates with/against all other heroes
    - [x] Restructure hero tables
- [ ] Setup API routes to get info from database
    - [x] Access to hero data
    - [ ] Access to match data
</details>

## Frontend
<details>
- [ ] Searchbar to more easily find heroes (ideally something like hero searching in Dota 2 client)
- [ ] Further webpack setup
    - [ ] Update paths with 'path' module
    - [x] Compile CSS with all necessary loaders
    - [ ] Switch to html template (html-webpack-plugin)
    - [ ] Use 'asset/module' to build images
- [x] Display all heroes
- [ ] Display empty draft grid (with order)
</details>

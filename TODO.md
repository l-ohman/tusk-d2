## General
- [ ] Ability to estimate winrate based on draft
- [ ] A tool to suggest picks/bans at different points within the draft
- [ ] In general, easier methods of getting matchup data

## Backend
<details>
- [x] Setup Hero table(s)
    - [x] Include base hero winrate, and relationship table between heroes 
    - [x] Include winrates with/against all other heroes
- [ ] Restructure hero tables
    - [x] Some data from Stratz is incorrect - need to calculate percentages manually
    - [x] Store synergy/counter in the db
    - [ ] Automate polling Stratz once a week and add it to pre-existing data
</details>

## Frontend
<details>
- [ ] Completely restructure store and calculations
- [x] Searchbar to more easily find heroes (should upgrade later)
- [ ] Further webpack setup
    - [ ] Update paths with 'path' module
    - [x] Compile CSS with all necessary loaders
    - [ ] Switch to html template (html-webpack-plugin)
    - [ ] Use 'asset/module' to build images
- [x] Display all heroes
- [x] Ability to ban heroes (and remove from suggestions)
- [ ] Add "expand matchups" button to show detailed counters/synergies per suggestion
- [ ] Display empty draft grid (with order)
- [ ] Upgrade Redux to RTK or Zustand
</details>

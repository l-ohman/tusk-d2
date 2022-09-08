## General
- [x] Come up with a sick name (like *Zeus*)
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
    - [x] Include winrates with/against all other heroes (Currently is stored as JSON - later I may end up re-creating hero relations table with many-to-many relationship)
- [ ] Restructure Match tables (need to rethink this entirely)
    - [ ] Implement Team tables if necessary
- [ ] Fix Stratz queries (to get matches by league) and organize directory
    - [ ] Create easier way to add matches to DB ~~(see server/seed.js)~~
    - [ ] If possible, get patch ID (and/or possibly name) directly from Stratz query
- [ ] Setup API routes to get info from database
    - [x] Access to hero data
    - [ ] Access to match data
</details>

## Frontend
<details>
- [ ] Further webpack setup
    - [ ] Update paths with 'path' module
    - [ ] Compile CSS with all necessary loaders
        - [ ] Should also extract CSS into separate file (Will need to split webpack.config at this point)
    - [ ] Switch to html template (html-webpack-plugin)
    - [ ] Use 'asset/module' to build images
- [ ] Display all heroes and empty draft grid
</details>

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
- [ ] Setup Hero table(s)
    - [ ] Include base hero winrate, and relationship table between heroes
    - [ ] Include winrates with/against all other heroes
- [ ] Restructure Match tables (need to rethink this entirely)
    - [ ] Implement Team tables if necessary
- [ ] Fix Stratz queries (to get matches by league) and organize directory
    - [ ] Create easier way to add matches to DB ~~(see server/seed.js)~~
    - [ ] If possible, get patch ID (and/or possibly name) directly from Stratz query
- [ ] Setup API routes to get info from database
    - [ ] Use req.params to get specific db entries(?)
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

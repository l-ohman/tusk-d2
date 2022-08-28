## General
- [ ] Come up with a sick name (like *Zeus*)

## Backend
- [ ] Restructure Match and Hero tables
    - [ ] Implement Team tables if necessary
    - [ ] Build relations within Hero tables (with/against WRs)
- [ ] Fix Stratz queries (to get matches by league) and organize directory
    - [ ] Create easier way to add matches to DB ~~(see server/seed.js)~~
    - [ ] If possible, get patch ID (and/or possibly name) directly from Stratz query
- [ ] Setup API routes to get info from database
    - [ ] Use req.params to get specific db entries

## Frontend
- [ ] Further webpack setup
    - [ ] Update paths with 'path' module
    - [ ] Compile CSS with all necessary loaders
        - [ ] Should also extract CSS into separate file (Will need to split webpack.config at this point)
    - [ ] Switch to html template (html-webpack-plugin)
    - [ ] Use 'asset/module' to build images
- [ ] Display all heroes and empty draft grid

### Ideas for later
- [ ] Hero winrate analysis
    - [ ] Ability to estimate winrate based on draft
    - [ ] A tool to suggest picks/bans at different points within the draft

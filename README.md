# dota 2 draft analysis tools (wip)
Dota 2 draft analysis/querying tools.

## various things to fix / refactor:
* Get patch ID (and/or possibly name) directly from Stratz query
* Restructure the API directory (and probably most dirs)
    * Stratz queries are happening all over the place, none of it is very intuitive or reasonable
    * DB entry also needs to be better centralized
    * ~~(However - the hero query can be an exception in 'heroEntry', as it is static data)~~

~~Note: 'Procfile' is for Heroku~~

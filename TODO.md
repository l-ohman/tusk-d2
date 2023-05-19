## General
- [ ] Ability to estimate winrate based on draft
- [ ] A tool to suggest picks/bans at different points within the draft
- [ ] In general, easier methods of getting matchup data
- [ ] Automate polling Stratz once a week and add it to pre-existing data <!-- Should prioritize this once db is restructured—the matchups are currently somewhat unreliable due to small sample sizes -->
- [x] Completely restructure store and calculations <!-- Move calculations and data restructure files; potentially switch state management to Zustand (or upgrade to RTK) -->
- [ ] Reset button to clear draft
  - [ ] Ability to undo picks and bans
- [x] Add "expand matchups" button to show detailed counters/synergies per suggestion <!-- This is current priority — also need to fix calculations, and possibly also rename "counter/synergy" in Redux to "radiant/dire" (or team A/B) -->

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initializeAllHeroes = async () => {
  const { data: heroList } = await axios.get("/api/heroes");
  const allHeroes = {};
  for (let i = 0; i < heroList.length; i++) {
    allHeroes[heroList[i].id] = {
      ...heroList[i],
      radiantRating: 0,
      direRating: 0,
      detailedMatchups: [],
      selectable: true,
      // potentially should add "low match count" flag here
    };
  }
  return allHeroes;
};

const matchupCalculatorSlice = createSlice({
  name: "matchupCalculatorSlice",
  initialState: {
    allHeroes: initializeAllHeroes(),
    // draftedHeroes: {},
    selectedHero: null,
    teams: {
      radiant: {},
      dire: {},
      banned: {},
    },
  },
  reducers: {
    setSelectedHero: (state, action) => ({
      ...state,
      selectedHero: action.payload,
    }),
    addHeroToTeam: (state, action) => {
      // For counters (vs), a larger NEGATIVE number means secondary hero is STRONGER against primary hero ---//
      // For synergies (with), a larger POSITIVE number means secondary hero is STRONGER when paired with primary hero ---//
      const hero = action.payload.hero;
      const isRadiant = action.payload.isRadiant;

      // update RR and DR of every other hero; add matchup to "detailedMatchups"
      for (const heroId in hero.with) {
        // if selected hero is on RADIANT:
          // add secondary hero's SYNERGY to RR
          // add secondary hero's COUNTER to DR
        // if selected hero is on DIRE:
          // subtract secondary hero's COUNTER to RR
          // subtract secondary hero's SYNERGY to DR
      }

      // add the hero in respective "teams" array
      if (isRadiant) {
        state.teams.radiant[hero.id] = hero;
      } else {
        state.teams.dire[hero.id] = hero;
      }

      // make the hero no longer selectable
      state.allHeroes[hero.id].selectable = false;
    },
  },
});

export default matchupCalculatorSlice.reducer;
export const { setSelectedHero, addHeroToTeam } =
  matchupCalculatorSlice.actions;

export const fetchAndCalculateHeroData =
  (heroId, isRadiant) => async (dispatch) => {
    const { data: hero } = await axios.get(`/api/heroes/${heroId}`);
    const payload = { hero, isRadiant };
    dispatch(addHeroToTeam(payload));
    dispatch(setSelectedHero(null));
  };

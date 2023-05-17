import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const matchupCalculatorSlice = createSlice({
  name: "matchupCalculatorSlice",
  initialState: {
    allHeroes: {},
    selectedHero: null,
    teams: {
      radiant: {
        count: 0,
        heroes: {}
      },
      dire: {
        count: 0,
        heroes: {}
      },
      banned: {
        count: 0,
        heroes: {}
      },
    },
  },
  reducers: {
    setAllHeroes: (state, action) => ({
      ...state,
      allHeroes: action.payload,
    }),
    setSelectedHero: (state, action) => ({
      ...state,
      selectedHero: action.payload,
    }),
    addHeroToTeam: (state, action) => {
      // For counters (vs), a larger NEGATIVE number means secondary hero is STRONGER against primary hero
      // For synergies (with), a larger POSITIVE number means secondary hero is STRONGER when paired with primary hero
      const primaryHero = action.payload.hero;
      const isRadiant = action.payload.isRadiant;
      const teamName = isRadiant ? "radiant" : "dire";

      if (state.teams[teamName].count === 5) {
        return state;
      }

      for (const secondaryHeroId in primaryHero.with) {
        const synergy = primaryHero.with[secondaryHeroId];
        const counter = primaryHero.vs[secondaryHeroId];

        // update radiant/dire ratings
        if (isRadiant) {
          state.allHeroes[secondaryHeroId].radiantRating += synergy.difference;
          state.allHeroes[secondaryHeroId].direRating += counter.difference;
        } else {
          state.allHeroes[secondaryHeroId].radiantRating -= counter.difference;
          state.allHeroes[secondaryHeroId].direRating -= synergy.difference;
        }

        // add to detailedMatchups
        const detailedMatchups =
          state.allHeroes[secondaryHeroId].detailedMatchups;
        if (isRadiant) {
          detailedMatchups.radiant[primaryHero.id] = { ...synergy, with: true };
          detailedMatchups.dire[primaryHero.id] = { ...counter, with: false };
        } else {
          detailedMatchups.radiant[primaryHero.id] = { ...counter, with: false };
          detailedMatchups.dire[primaryHero.id] = { ...synergy, with: true };
        }
      }

      state.teams[teamName].heroes[primaryHero.id] = state.teams[teamName].count;
      state.teams[teamName].count += 1;
      state.allHeroes[primaryHero.id].selectable = false;
      return state;
    },
    banHero: (state, action) => {
      state.teams.banned.heroes[action.payload] = state.teams.banned.count;
      state.teams.banned.count += 1;
      state.allHeroes[action.payload].selectable = false;
      state.selectedHero = null;
      return state;
    },
  },
});

export default matchupCalculatorSlice.reducer;
export const { setAllHeroes, setSelectedHero, addHeroToTeam, banHero } =
  matchupCalculatorSlice.actions;

export const initializeAllHeroes = () => async (dispatch) => {
  const { data: heroList } = await axios.get("/api/heroes");
  const allHeroes = {};
  for (let i = 0; i < heroList.length; i++) {
    allHeroes[heroList[i].id] = {
      ...heroList[i],
      radiantRating: 0,
      direRating: 0,
      detailedMatchups: {
        radiant: {},
        dire: {},
      },
      selectable: true,
      lowMatchCount: false, // considering adding this to the matchup items in database as virtual field
    };
  }
  dispatch(setAllHeroes(allHeroes));
};

export const fetchAndCalculateHeroData =
  (heroId, isRadiant) => async (dispatch) => {
    const { data: hero } = await axios.get(`/api/heroes/${heroId}`);
    const payload = { hero, isRadiant };
    dispatch(addHeroToTeam(payload));
    dispatch(setSelectedHero(null));
  };

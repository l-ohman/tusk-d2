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
      detailedMatchups: {
        radiant: {},
        dire: {},
      },
      selectable: true,
      lowMatchCount: false, // considering adding this to the matchup items in database as virtual field
    };
  }
  return allHeroes;
};

const matchupCalculatorSlice = createSlice({
  name: "matchupCalculatorSlice",
  initialState: {
    allHeroes: initializeAllHeroes(),
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
      // For counters (vs), a larger NEGATIVE number means secondary hero is STRONGER against primary hero
      // For synergies (with), a larger POSITIVE number means secondary hero is STRONGER when paired with primary hero
      const primaryHero = action.payload.hero;
      const isRadiant = action.payload.isRadiant;

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
          detailedMatchups.radiant[primaryHero.id] = synergy;
          detailedMatchups.dire[primaryHero.id] = counter;
        } else {
          detailedMatchups.radiant[primaryHero.id] = counter;
          detailedMatchups.dire[primaryHero.id] = synergy;
        }
      }

      // add the hero in respective "teams" array and make hero unselectable
      if (isRadiant) {
        state.teams.radiant[hero.id] = hero;
      } else {
        state.teams.dire[hero.id] = hero;
      }
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

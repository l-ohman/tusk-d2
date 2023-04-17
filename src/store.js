import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loggingMiddleware from "redux-logger";

const initState = {
  heroes: {}, // all heroes with id as key, value as with {name, winrate, primary attribute, counters, synergies}
  selectedHeroesData: {}, // data for heroes currently in draft
  selectedHero: {},
  teams: {
    radiant: [],
    dire: [],
    banned: [],
  },
};

// action types
const SET_HERO_LIST = "SET_HERO_LIST";
const GET_HERO_DATA = "GET_HERO_DATA";
const SET_SELECTED_HERO = "SET_SELECTED_HERO";
const ADD_HERO_TO_TEAM = "ADD_HERO_TO_TEAM";
// const UPDATE_MATCHUP_VALUES = "UPDATE_MATCHUP_VALUES";
const BAN_HERO = "BAN_HERO";
const MAKE_UNSELECTABLE = "MAKE_UNSELECTABLE";

// actions creators
const setHeroList = (heroes) => ({
  type: SET_HERO_LIST,
  heroes,
});
const getHeroData = (heroData, team) => ({
  type: GET_HERO_DATA,
  id: heroData.id,
  heroData,
  team,
});
export const setSelectedHero = (hero) => ({
  type: SET_SELECTED_HERO,
  hero,
});
export const addHeroToTeam = (hero, team) => ({
  type: ADD_HERO_TO_TEAM,
  hero,
  team,
});
export const banHeroId = (heroId) => ({
  type: BAN_HERO,
  heroId,
});
export const makeHeroIdUnselectable = (heroId) => ({
  type: MAKE_UNSELECTABLE,
  heroId,
});

// thunks
export const setAllHeroes = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/heroes");

    const heroesObject = {};
    data.forEach((hero, idx) => {
      data[idx].radiantRating = 0;
      data[idx].direRating = 0;
      data[idx].detailedCounters = [];
      data[idx].detailedSynergies = [];
      data[idx].selectable = true;
      heroesObject[hero.id] = hero;
    });

    dispatch(setHeroList(heroesObject));
  } catch (error) {
    console.error(error);
  }
};

export const fetchHeroData = (heroId, team) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/heroes/${heroId}`);
    dispatch(getHeroData(data, team));
  } catch (error) {
    console.error(error);
  }
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_HERO_LIST:
      return { ...state, heroes: action.heroes };
    case GET_HERO_DATA:
      for (const heroId in action.heroData.vs) {
        if (
          Object.keys(state.selectedHeroesData).includes(
            (hero) => hero.id === heroId
          )
        )
          continue;

        state.heroes[heroId].detailedCounters.push({
          heroId: action.id,
          value: action.heroData.vs[heroId].difference,
        });
        state.heroes[heroId].detailedSynergies.push({
          heroId: action.id,
          value: action.heroData.with[heroId].difference,
        });
        
        if (action.team === "radiant") {
          state.heroes[heroId].radiantRating += action.heroData.with[heroId].difference;
          state.heroes[heroId].direRating -= action.heroData.vs[heroId].difference;
        } else {
          state.heroes[heroId].radiantRating -= action.heroData.with[heroId].difference;
          state.heroes[heroId].direRating += action.heroData.vs[heroId].difference;
        }
      }

      const newHero = { [action.id]: action.heroData };
      return {
        ...state,
        selectedHeroesData: { ...state.selectedHeroesData, ...newHero },
      };
    case SET_SELECTED_HERO:
      return { ...state, selectedHero: action.hero };
    case ADD_HERO_TO_TEAM:
      const teams = { ...state.teams };
      teams[action.team].push(action.hero);
      return { ...state, teams };
    case BAN_HERO:
      const updatedTeams = state.teams;
      updatedTeams.banned.push(action.heroId);
      return { ...state, teams: updatedTeams };
    case MAKE_UNSELECTABLE:
      state.heroes[action.heroId].selectable = false;
      return state;
    default:
      return state;
  }
};

export default createStore(reducer, applyMiddleware(thunk, loggingMiddleware));

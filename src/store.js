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
  },
};

// action types
const SET_HERO_LIST = "SET_HERO_LIST";
const GET_HERO_DATA = "GET_HERO_DATA";
const SET_SELECTED_HERO = "SET_SELECTED_HERO";
const ADD_HERO_TO_TEAM = "ADD_HERO_TO_TEAM";
// const UPDATE_MATCHUP_VALUES = "UPDATE_MATCHUP_VALUES";
const BAN_HERO = "BAN_HERO";

// actions creators
const setHeroList = (heroes) => ({
  type: SET_HERO_LIST,
  heroes,
});
const getHeroData = (heroData) => ({
  type: GET_HERO_DATA,
  id: heroData.id,
  heroData,
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
export const makeHeroIdUnselectable = (heroId) => ({
  type: BAN_HERO,
  heroId
})

// thunks
export const setAllHeroes = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/heroes");

    const heroesObject = {};
    data.forEach((hero, idx) => {
      data[idx].counterRating = 0;
      data[idx].synergyRating = 0;
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

export const fetchHeroData = (heroId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/heroes/${heroId}`);
    dispatch(getHeroData(data));
  } catch (error) {
    console.error(error);
  }
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_HERO_LIST:
      return { ...state, heroes: action.heroes };
    case GET_HERO_DATA:
      const newHero = { [action.id]: action.heroData };
      for (const heroId in action.heroData.vs) {
        // if you're reading this, i'm sorry
        if (Object.keys(state.selectedHeroesData).includes(hero => hero.id === heroId)) continue;

        state.heroes[heroId].detailedCounters.push({
          heroId: action.id,
          value: action.heroData.vs[heroId].difference,
        });
        state.heroes[heroId].counterRating +=
          action.heroData.vs[heroId].difference;
        state.heroes[heroId].counterRating = Number(
          state.heroes[heroId].counterRating.toPrecision(4)
        );

        state.heroes[heroId].detailedSynergies.push({
          heroId: action.id,
          value: action.heroData.with[heroId].difference,
        });
        state.heroes[heroId].synergyRating +=
          action.heroData.with[heroId].difference;
        state.heroes[heroId].synergyRating = Number(
          state.heroes[heroId].synergyRating.toPrecision(4)
        );
      }

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
      state.heroes[action.heroId].selectable = false;
      return state;
    default:
      return state;
  }
};

export default createStore(reducer, applyMiddleware(thunk, loggingMiddleware));

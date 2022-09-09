import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loggingMiddleware from "redux-logger";

let initState = {
  heroes: [],
  heroData: {},
  selectedHero: {},
  teams: {
    radiant: [],
    dire: [],
  }
};

// action types
const SET_HERO_LIST = "SET_HERO_LIST";
const GET_HERO_DATA = "GET_HERO_DATA";
const SET_SELECTED_HERO = "SET_SELECTED_HERO";
const ADD_HERO_TO_TEAM = "ADD_HERO_TO_TEAM";

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
})
export const addHeroToTeam = (hero, team) => ({
  type: ADD_HERO_TO_TEAM,
  hero,
  team,
})

// thunks
export const setAllHeroes = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/heroes");
    
    // temporarily(?) sorting the heroes alphabetically here
    data.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (b.name > a.name) return 1;
    })

    dispatch(setHeroList(data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchHeroData = (heroId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/heroes/${heroId}`);
    console.log('data: ', data)
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
      let newHero = {}
      newHero[action.id] = action.heroData;

      return {...state, heroData: {...state.heroData, ...newHero}};
    case SET_SELECTED_HERO:
      return {...state, selectedHero: action.hero};
    case ADD_HERO_TO_TEAM:
      let teams = {...state.teams};
      teams[action.team].push(action.hero);
      return {...state, teams}
    default:
      return state;
  }
};

export default createStore(reducer, applyMiddleware(thunk, loggingMiddleware));

import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loggingMiddleware from "redux-logger";

let initState = {
  heroes: [],
  heroData: {},
};

// action types
const SET_HERO_LIST = "SET_HERO_LIST";
const GET_HERO_DATA = "GET_HERO_DATA";

// actions creators
const setHeroList = (heroes) => ({
  type: SET_HERO_LIST,
  heroes,
});
const getHeroData = (heroData) => ({
  type: GET_HERO_DATA,
  heroData,
});

// thunks
export const setAllHeroes = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/heroes");
    dispatch(setHeroList(data));
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
      return {...state, heroData: action.heroData};
    default:
      return state;
  }
};

export default createStore(reducer, applyMiddleware(thunk, loggingMiddleware));

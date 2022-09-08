import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loggingMiddleware from "redux-logger";

let initState = {};

// action types
const GET_HERO_NAME = "GET_HERO_NAME";
const GET_HERO_WINRATE = "GET_HERO_WINRATE";

// actions creators
const getHeroName = (heroName) => ({
  type: GET_HERO_NAME,
  heroName,
});
const getHeroWinrate = (heroId) => ({
  type: GET_HERO_WINRATE,
  heroId,
});

// thunks
export const fetchHeroName = (heroId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/heroes/`);
    const hero = data.find(item => item.id === heroId);
    dispatch(getHeroName(hero.name));
  } catch (error) {
    console.error(error);
  }
}

export const fetchHeroWinrate = (heroId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/heroes/${heroId}/winrate`)
    dispatch(getHeroWinrate(+data)) // converting to num here is probably bad
  } catch (error) {
    console.error(error);
  }
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default createStore(reducer, applyMiddleware(thunk, loggingMiddleware));

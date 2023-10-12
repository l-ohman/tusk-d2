import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ti12Slice = createSlice({
  name: "ti12Slice",
  initialState: {
    allHeroes: {},
    allMatches: [],
  },
  reducers: {
    setAllTiHeroes: (state, action) => ({
      ...state,
      allHeroes: action.payload,
    }),
    setAllTiMatches: (state, action) => ({
      ...state,
      allMatches: action.payload,
    }),
  },
});

export default ti12Slice.reducer;
const { setAllTiHeroes, setAllTiMatches } = ti12Slice.actions;

export const initializeTI12Data = () => async (dispatch) => {
  const { data: heroes } = await axios.get("/api/ti12/heroes");
  const allTiHeroes = {};
  for (const hero of heroes) {
    allTiHeroes[hero.id] = hero;
  }
  dispatch(setAllTiHeroes(allTiHeroes));

  const { data: allTiMatches } = await axios.get("/api/ti12/matches");
  dispatch(setAllTiMatches(allTiMatches));
};

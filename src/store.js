import axios from "axios";
import { createStore } from "redux";

let initState = {};

const reducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default createStore(reducer);

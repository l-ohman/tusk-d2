import matchupCalculatorReducer from "./matchupCalculatorSlice";
import singleHeroViewerReducer from "./singleHeroViewerSlice";
import buildGeneratorReducer from "./buildGeneratorSlice";
import ti12Reducer from "./ti12Slice";

import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "redux-logger";

export default configureStore({
  reducer: {
    matchupCalculator: matchupCalculatorReducer,
    singleHeroViewer: singleHeroViewerReducer,
    buildGenerator: buildGeneratorReducer,
    ti12: ti12Reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

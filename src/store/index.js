import matchupCalculatorReducer from "./matchupCalculatorSlice";
import singleHeroViewerReducer from "./singleHeroViewerSlice";
import buildGeneratorReducer from "./buildGeneratorSlice";

import { configureStore } from '@reduxjs/toolkit';
import loggerMiddleware from "redux-logger";

export default configureStore ({
  reducer: {
      matchupCalculator: matchupCalculatorReducer,
      singleHeroViewer: singleHeroViewerReducer,
      buildGenerator: buildGeneratorReducer,
  },
  middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(loggerMiddleware),
});

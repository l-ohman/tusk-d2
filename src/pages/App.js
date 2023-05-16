import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Header, Footer } from "../components";
import { initializeAllHeroes } from "../store/matchupCalculatorSlice";
import { MatchupCalculator, BuildGenerator } from "./";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAllHeroes());
  }, []);

  return (
    <>
      <div id="page-container">
        {/* <Header /> */}
        <Routes>
          <Route index element={<MatchupCalculator />} />
          {/* <Route path="/matchup-calculator" element={<MatchupCalculator />} />
          <Route path="/build" element={<BuildGenerator />}/> */}
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  );
}

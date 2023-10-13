import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Header, Footer } from "../components";
import { initializeAllHeroes } from "../store/matchupCalculatorSlice";
import { initializeTI12Data } from "../store/ti12Slice";
import { MatchupCalculator, TI12Matches, TI12Heroes } from "./";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      await dispatch(initializeAllHeroes());
      await dispatch(initializeTI12Data());
    };
    init();
  }, []);

  return (
    <>
      <div id="page-container">
        <Header />
        <Routes>
          <Route index element={<MatchupCalculator />} />
          <Route path="/ti12/matches" element={<TI12Matches />} />
          <Route path="/ti12/heroes" element={<TI12Heroes />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

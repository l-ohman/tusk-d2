import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Header, Footer } from "../components";
import { initializeAllHeroes } from "../store/matchupCalculatorSlice";
import { initializeTI12Data } from "../store/ti12Slice";
import { MatchupCalculator, BuildGenerator, TI12Stats } from "./";

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
          <Route path="/ti12" element={<TI12Stats />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

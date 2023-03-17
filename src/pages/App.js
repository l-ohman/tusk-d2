import React from "react";
import { /*useSelector,*/ useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Header, Footer } from "../components";
import { setAllHeroes } from "../store";
import { MatchupCalculator, BuildGenerator, SingleMatchupViewer } from "./";

export default function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setAllHeroes());
  }, []);

  return (
    <>
      <div id="page-container">
        <Header />
        <Routes>
          <Route index element={<MatchupCalculator />} />
          <Route path="matchup-calculator" element={<MatchupCalculator />} />
          <Route path="/build" element={<BuildGenerator />}/>
          <Route path="/hero-matchups" element={<SingleMatchupViewer />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </>
  );
}

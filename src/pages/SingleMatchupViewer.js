import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HeroList, Matchups, SingleHeroData } from "../components";
import { fetchHeroData } from "../store";

export default function SingleMatchupViewer() {
  // const [heroData, setSelectedHero] = useState("");
  const selectedHero = useSelector((state) => state.selectedHero);
  console.log("selected hero:", selectedHero?.name);

  return (
    <div id="singleMatchupViewer">
      <h2 id="contentHeader">Single Matchup Viewer</h2>
      <HeroList />
      {selectedHero.id ? (
        <>
          <SingleHeroData hero={selectedHero}/>
          <div className="matchupContainer">
            <Matchups side="With" hero={selectedHero.name} />
            <Matchups side="Against" hero={selectedHero.name} />
          </div>
        </>
      ) : (
        <p className="helptext">Select a hero to view data</p>
      )}
    </div>
  );
}

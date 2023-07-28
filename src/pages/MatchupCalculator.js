import React from "react"
import {
  CurrentTeams,
  HeroList,
  HeroRecommendations,
  SelectedHero,
  BannedHeroes,
} from "../components";

export default function MatchupCalculator() {
  return (
    <>
    <p id="disclaimer">Data from the week of July 21 - July 28, 2023</p>
      <div id="draft-container">
        <HeroList />
        <div className="rightContainer">
          <SelectedHero />
          <CurrentTeams />
          <BannedHeroes />
        </div>
      </div>

      <HeroRecommendations />
    </>
  );
}

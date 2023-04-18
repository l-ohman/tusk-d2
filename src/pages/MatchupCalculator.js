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

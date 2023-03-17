import React from "react"
import {
  CurrentTeams,
  HeroList,
  HeroRecommendations,
  HeroSelection,
  BannedHeroes,
} from "../components";

export default function MatchupCalculator() {
  return (
    <>
      <div id="draft-container">
        <HeroList />
        <div className="rightContainer">
          <HeroSelection />
          <CurrentTeams />
          <BannedHeroes />
        </div>
      </div>

      <HeroRecommendations />
    </>
  );
}

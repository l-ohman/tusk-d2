import React from "react";
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
      <p id="disclaimer">
        Data from July 21 - August 3, 2023 (
        <a href="https://www.dota2.com/patches/7.33e" target="_blank">
          Patch 7.33e
        </a>
        )
      </p>
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

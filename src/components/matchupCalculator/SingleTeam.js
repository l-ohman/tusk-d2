import React from "react";
import { useSelector } from "react-redux";

function SingleTeam({ isRadiant }) {
  const allHeroes = useSelector((state) => state.matchupCalculator.allHeroes);
  const team = useSelector(
    (state) => state.matchupCalculator.teams[isRadiant ? "radiant" : "dire"]
  );
  // ensure they remain sorted by pick order instead of heroId
  const heroesOnTeam = Object.keys(team.heroes).sort((idA,idB) => team.heroes[idA] - team.heroes[idB]);

  return (
    <div className={`singleTeamContainer${!isRadiant ? " direTeam" : ""}`}>
      <h2>{isRadiant ? "Radiant " : "Dire "}</h2>
      <div className="singleTeamContainerHeroes">
        {heroesOnTeam.map((heroId) => {
          return (
            <img
              key={heroId}
              src={`assets/heroIcons/${allHeroes[heroId].name.replaceAll(
                " ",
                "_"
              )}_icon.webp`}
              className={`heroOnTeam${isRadiant ? " radiant" : " dire"}`}
            />
          );
        })}
        {Array(5 - team.count)
          .fill(0)
          .map((x, i) => (
            <div
              className={`emptyHero${isRadiant ? " radiant" : " dire"}`}
              key={i}
            ></div>
          ))}
      </div>
    </div>
  );
}

export default SingleTeam;

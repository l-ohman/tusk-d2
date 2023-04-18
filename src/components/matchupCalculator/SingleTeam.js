import React from "react";
import { useSelector } from "react-redux";

function SingleTeam({ isRadiant }) {
  const allHeroes = useSelector((state) => state.matchupCalculator.allHeroes);
  const team = useSelector(
    (state) => state.matchupCalculator.teams[isRadiant ? "radiant" : "dire"]
  );

  return (
    <div className="singleTeamContainer">
      <h2>{isRadiant ? "Radiant " : "Dire "}</h2>
      <div className="singleTeamContainerHeroes">
        {Object.keys(team).map((heroId) => {
          return (
            <img
              key={heroId}
              src={`assets/heroIcons/${allHeroes[heroId].name.replaceAll(
                " ",
                "_"
              )}_icon.webp`}
              className="heroOnTeam"
            />
          );
        })}
      </div>
    </div>
  );
}

export default SingleTeam;

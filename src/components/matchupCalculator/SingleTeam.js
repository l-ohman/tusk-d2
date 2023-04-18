import React from "react";
import { useSelector } from "react-redux";

function SingleTeam({ isRadiant }) {
  const teams = useSelector((state) => state.matchupCalculator.teams);

  return (
    <div className="singleTeamContainer">
      <h2>{isRadiant ? "Radiant " : "Dire "}Team placeholder</h2>
      {/* <div className="singleTeamContainerHeroes">
        {thisTeam.map((hero) => {
          return (
            <img
              key={hero.id}
              src={`assets/heroIcons/${hero.name.replaceAll(" ", "_")}_icon.webp`}
              className="heroOnTeam"
            />
          );
        })}
      </div> */}
    </div>
  );
}

export default SingleTeam;

import React from "react";
import { useSelector } from "react-redux";

function SingleTeam({ team }) {
    const teams = useSelector(state => state.teams);
    const thisTeam = teams[team];

  return (
    <div className="singleTeamContainer">
      <h2>{team[0].toUpperCase() + team.slice(1)}</h2>
      <div className="singleTeamContainerHeroes">
        {thisTeam.map(hero => {
            return <img key={hero.id} src={`assets/heroIcons/${hero.name}_icon.webp`} 
            className="heroOnTeam"/>
        })}
      </div>
    </div>
  );
}

export default SingleTeam;

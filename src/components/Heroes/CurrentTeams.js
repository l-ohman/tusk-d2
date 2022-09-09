import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchHeroData } from "../../store";
import SingleTeam from "./SingleTeam";


function CurrentTeams() {
  const teams = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  // should add hero data for each hero when they are added to a TEAM instead of this
  React.useEffect(() => {
    const heroesSelected = [...teams.radiant, ...teams.dire];

    const getHeroData = async (heroIds) => {
      // should check to see if the hero is in the object already, to not call the server for data it already has
      for (let i = 0; i < heroIds.length; i++) {
        await dispatch(fetchHeroData(heroIds[i].id));
      }
    };
    getHeroData(heroesSelected);
  }, [teams]);

  return (
    <div className="teamsContainer">
      <SingleTeam team="radiant" />
      <SingleTeam team="dire" />
    </div>
  );
}

export default CurrentTeams;

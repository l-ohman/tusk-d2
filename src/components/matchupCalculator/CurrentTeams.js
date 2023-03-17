import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchHeroData } from "../../store";
import SingleTeam from "./SingleTeam";

export default function CurrentTeams() {
  const teams = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  return (
    <div className="teamsContainer">
      <SingleTeam team="radiant" />
      <SingleTeam team="dire" />
    </div>
  );
}

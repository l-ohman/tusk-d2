import React from "react";

import SingleTeam from "./SingleTeam";

export default function CurrentTeams() {
  return (
    <div className="teamsContainer">
      <SingleTeam team="radiant" />
      <SingleTeam team="dire" />
    </div>
  );
}

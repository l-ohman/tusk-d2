import React from "react";
import SingleTeam from "./SingleTeam";

function CurrentTeams () {
    return(<div className="teamsContainer">
        <SingleTeam team="radiant"/>
        <SingleTeam team="dire"/>
    </div>)
}

export default CurrentTeams;

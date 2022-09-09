import React from "react";
import { useSelector } from "react-redux";
import Matchups from "./Matchup";

function HeroRecs () {
    const teams = useSelector(state => state.teams);

    return(<div className="matchupContainer">
        <Matchups team="radiant" against={false} />
        <Matchups team="radiant" against={true} />
        {/* <Matchups team="dire" against={false} />
        <Matchups team="dire" against={true} /> */}
    </div>)
}

export default HeroRecs;

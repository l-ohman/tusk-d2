import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Matchups from "./Matchup";
import { buildMatchupData } from "../../HeroMatchupCalculations";
// import { setMatchupData } from "../../store";

function HeroRecs() {
  const state = useSelector(state => state)
  // const dispatch = useDispatch();
  const [matchupData, setMatchupData] = React.useState({});

  const setData = () => {
    let newMatchupData = buildMatchupData(state.heroes, state.heroData, state.teams);
    setMatchupData(newMatchupData);
    console.log('matchup data: ', newMatchupData);
  }

  return (
    <>
      <div className="tmpCenter">
        <button onClick={() => setData()}>Get matchups</button>
      </div>
      <div className="matchupContainer">
        <Matchups team="radiant" against={false} data={matchupData} />
        <Matchups team="radiant" against={true} data={matchupData} />
        {/* <Matchups team="dire" against={false} />
        <Matchups team="dire" against={true} /> */}
      </div>
    </>
  );
}

export default HeroRecs;

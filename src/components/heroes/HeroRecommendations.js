import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Matchups from "./Matchup";
import { buildMatchupData } from "../../HeroMatchupCalculations";
// import { setMatchupData } from "../../store";

export default function HeroRecommendations() {
  const state = useSelector((state) => state);
  // const dispatch = useDispatch();
  const [matchupData, setMatchupData] = React.useState({});

  const setData = () => {
    const newMatchupData = buildMatchupData(
      state.heroes,
      state.selectedHeroesData,
      state.teams
    );
    setMatchupData(newMatchupData);
  };

  return (
    <>
      <div className="tmpCenter">
        <button onClick={() => setData()}>Show best picks</button>
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

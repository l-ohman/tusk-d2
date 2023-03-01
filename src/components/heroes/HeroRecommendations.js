import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import Matchups from "./Matchup";
// import { buildMatchupData } from "../../HeroMatchupCalculations";
// import { setMatchupData } from "../../store";

export default function HeroRecommendations() {
  const [update, setUpdate] = useState(false);
  
  useEffect(() => {
    if (update === true) {
      setUpdate(false);
    }
  }, [update]);

  const showBestPicks = () => {
    setUpdate(true);
  }

  return (
    <>
      <div className="tmpCenter">
        <button onClick={() => showBestPicks()}>Show best picks</button>
      </div>
      <div className="matchupContainer">
        <Matchups team="Radiant" update={update} />
        <Matchups team="Dire" update={update} />
      </div>
    </>
  );
}

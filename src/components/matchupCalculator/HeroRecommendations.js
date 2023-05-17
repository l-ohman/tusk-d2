import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Matchups from "./Matchups";

export default function HeroRecommendations() {
  const teams = useSelector((state) => state.matchupCalculator.teams);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate(true);
  }, [teams]);

  useEffect(() => {
    if (update === true) {
      setUpdate(false);
    }
  }, [update]);

  return (
    <div className="matchupContainer">
      <Matchups team="Radiant" update={update} />
      <Matchups team="Dire" update={update} />
    </div>
  );
}

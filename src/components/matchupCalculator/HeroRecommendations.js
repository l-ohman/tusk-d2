import React, { useState, useEffect } from "react";
import Matchups from "./Matchups";

export default function HeroRecommendations() {
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (update === true) {
      setUpdate(false);
    }
  }, [update]);

  const showBestPicks = () => {
    setUpdate(true);
  };

  return (
    <>
      <div className="tmpCenter">
        <button onClick={() => showBestPicks()}>Update recommendations</button>
      </div>
      <div className="matchupContainer">
        <Matchups team="Radiant" update={update} />
        <Matchups team="Dire" update={update} />
      </div>
    </>
  );
}

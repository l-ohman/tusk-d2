import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HeroList, Matchups, SingleHeroData } from "../components";
import { fetchHeroData } from "../store";

export default function SingleMatchupViewer() {
  const [update, setUpdate] = useState(false);
  const selectedHero = useSelector((state) => state.selectedHero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedHero.id) getHero();
  }, [selectedHero]);

  const getHero = async () => {
    await dispatch(fetchHeroData(selectedHero.id));
    setUpdate(true);
    // .....
    if (update === true) {
      setUpdate(false);
    }
  }

  return (
    <div id="singleMatchupViewer">
      <h2 id="contentHeader">Single Matchup Viewer</h2>
      <HeroList />
      {selectedHero.id ? (
        <>
          <SingleHeroData hero={selectedHero} />
          <div className="matchupContainer">
            <Matchups side="With" hero={selectedHero.name} update={update} />
            <Matchups side="Against" hero={selectedHero.name} update={update} />
          </div>
        </>
      ) : (
        <p className="helptext">Select a hero to view data</p>
      )}
    </div>
  );
}

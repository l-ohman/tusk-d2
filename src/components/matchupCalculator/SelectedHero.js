import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAndCalculateHeroData,
  banHero,
} from "../../store/matchupCalculatorSlice";

export default function SelectedHero() {
  const selectedHero = useSelector(
    (state) => state.matchupCalculator.selectedHero
  );
  const dispatch = useDispatch();

  const handlePick = async (heroId, isRadiant) => {
    await dispatch(fetchAndCalculateHeroData(heroId, isRadiant));
  };

  const banHeroId = (heroId) => {
    dispatch(banHero(heroId));
  };

  return (
    <div id="heroSelectionContainer">
      {selectedHero ? (
        <div id="selectedHero">
          {/* <h3>Current hero selected:</h3> */}
          <h1>{selectedHero.name.replaceAll("_", " ")}</h1>
          <div>
            <img
              src={`assets/heroIcons/${selectedHero.name.replaceAll(
                " ",
                "_"
              )}_icon.webp`}
              // draft img is 150px x 84.37px
              alt={`${selectedHero.name} icon`}
            />
            <div id="heroDetails">
              <p>{`${(selectedHero.winrate * 100).toPrecision(4)}% winrate`}</p>
              <p>Roles placeholder</p>
              <p>Meta hero eval</p>
            </div>
          </div>
        </div>
      ) : (
        <div id="selectedHeroNone">
          <h3>Select a Hero</h3>
        </div>
      )}
      {/* <hr /> */}
      <div id="selectionButtons">
        <button onClick={() => handlePick(selectedHero.id, true)}>
          Add hero to radiant
        </button>
        <button onClick={() => handlePick(selectedHero.id, false)}>
          Add hero to dire
        </button>
        <button onClick={() => banHeroId(selectedHero.id)}>Ban hero</button>
      </div>
    </div>
  );
}

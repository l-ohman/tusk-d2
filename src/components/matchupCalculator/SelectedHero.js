import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAndCalculateHeroData,
  banHero,
} from "../../store/matchupCalculatorSlice";
import { HeroSelectionButtons } from "../";

export default function SelectedHero() {
  const selectedHero = useSelector(
    (state) => state.matchupCalculator.selectedHero
  );
  const teams = useSelector((state) => state.matchupCalculator.teams);
  const dispatch = useDispatch();

  const handlePick = async (heroId, isRadiant) => {
    if (heroId) await dispatch(fetchAndCalculateHeroData(heroId, isRadiant));
  };

  const banHeroId = (heroId) => {
    if (heroId) dispatch(banHero(heroId));
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
              alt={`${selectedHero.name}`}
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
        <div
          onClick={() => handlePick(selectedHero?.id, true)}
          className={`selectionButton${
            teams.radiant.count >= 5 || selectedHero === null
              ? " disabledButton"
              : ""
          }`}
        >
          Add to Radiant
        </div>
        <div
          onClick={() => banHeroId(selectedHero?.id)}
          className={`selectionButton banButton${
            selectedHero === null ? " disabledButton" : ""
          }`}
        >
          Ban
        </div>
        <div
          onClick={() => handlePick(selectedHero?.id, false)}
          className={`selectionButton${
            teams.dire.count >= 5 || selectedHero === null
              ? " disabledButton"
              : ""
          }`}
        >
          Add to Dire
        </div>
      </div>
    </div>
  );
}

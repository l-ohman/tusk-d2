import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHero, addHeroToTeam, banHero } from "../../store/matchupCalculatorSlice";

function HeroSelection() {
  const selectedHero = useSelector((state) => state.matchupCalculator.selectedHero);
  const dispatch = useDispatch();

  const handlePick = async (hero, isRadiant) => {
    dispatch(addHeroToTeam(hero, isRadiant));
    await dispatch(fetchHeroData(hero.id, team));
    dispatch(setSelectedHero({}));
    dispatch(makeHeroIdUnselectable(hero.id));
  };

  const banHeroId = (heroId) => {
    dispatch(banHero(heroId));
  };

  if (selectedHero) {
    return (
      <div className="heroSelection">
        <h3>Current hero selected:</h3>
        <h1>{selectedHero.name.replaceAll("_", " ")}</h1>
        <img
          src={`assets/heroIcons/${selectedHero.name.replaceAll(
            " ",
            "_"
          )}_icon.webp`}
          alt={`${selectedHero.name} icon`}
          className="heroSelected"
        />
        <hr />
        <button onClick={() => handlePick(selectedHero, true)}>
          Add hero to radiant
        </button>
        <button onClick={() => handlePick(selectedHero, false)}>
          Add hero to dire
        </button>
        <button onClick={() => banHeroId(selectedHero.id)}>
          Ban hero
        </button>
      </div>
    );
  } else
    return (
      <div className="heroSelection">
        <h2>No hero selected</h2>
      </div>
    );
}

export default HeroSelection;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addHeroToTeam, fetchHeroData, banHeroId, setSelectedHero, makeHeroIdUnselectable } from "../../store";

function HeroSelection() {
  const selectedHero = useSelector((state) => state.selectedHero);
  const dispatch = useDispatch();

  const handlePick = async (hero, team) => {
    dispatch(addHeroToTeam(hero, team));
    await dispatch(fetchHeroData(hero.id));
    dispatch(setSelectedHero({}));
    dispatch(makeHeroIdUnselectable(hero.id));
  };

  const banHero = (hero) => {
    // yikes
    dispatch(banHeroId(hero.id));
    dispatch(makeHeroIdUnselectable(hero.id));
    dispatch(setSelectedHero({}));
  };

  if (selectedHero.id) {
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
        <button onClick={() => handlePick(selectedHero, "radiant")}>
          Add hero to radiant
        </button>
        <button onClick={() => handlePick(selectedHero, "dire")}>
          Add hero to dire
        </button>
        <button onClick={() => banHero(selectedHero)}>
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

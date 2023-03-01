import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addHeroToTeam, fetchHeroData } from "../../store";

function HeroSelection() {
  const selectedHero = useSelector((state) => state.selectedHero);
  const dispatch = useDispatch();

  const handleClick = async (hero, team) => {
    dispatch(addHeroToTeam(hero, team));
    await dispatch(fetchHeroData(hero.id));
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
        <button onClick={() => handleClick(selectedHero, "radiant")}>
          Add hero to radiant
        </button>
        <button onClick={() => handleClick(selectedHero, "dire")}>
          Add hero to dire
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

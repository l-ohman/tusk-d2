import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHero } from "../../store";

function HeroList() {
  const allHeroes = useSelector((state) => state.heroes);
  const dispatch = useDispatch();

  return (
    <div className="leftContainer heroIconsContainer">
      {allHeroes.map((hero) => {
        return (
          <img
            key={hero.id}
            src={`assets/heroIcons/${hero.name.replaceAll(" ", "_")}_icon.webp`}
            alt={`${hero.name} icon`}
            onClick={() => dispatch(setSelectedHero(hero))}
            className="heroIconDraft"
          />
        );
      })}
    </div>
  );
}

export default HeroList;

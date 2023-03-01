import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHero } from "../../store";

function HeroList() {
  const allHeroes = useSelector((state) => state.heroes);
  const dispatch = useDispatch();

  return (
    <div className="leftContainer heroIconsContainer">
      {Object.keys(allHeroes).map((heroId) => {
        const hero = allHeroes[heroId];
        return (
          <img
            key={heroId}
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

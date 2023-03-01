import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHero } from "../../store";

function HeroList() {
  const allHeroes = useSelector((state) => state.heroes);
  const selectedHero = useSelector(state => state.selectedHero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedHero === {}) console.log("HERE");
  }, [selectedHero])

  return (
    <div className="leftContainer heroIconsContainer">
      {Object.keys(allHeroes).map((heroId) => {
        const hero = allHeroes[heroId];
        return (
          <img
            key={heroId}
            src={`assets/heroIcons/${hero.name.replaceAll(" ", "_")}_icon.webp`}
            alt={`${hero.name} icon`}
            onClick={hero.selectable ? () => dispatch(setSelectedHero(hero)) : () => alert("That hero is already selected/banned")}
            className={`heroIconDraft ${!hero.selectable ? "unselectable" : ""}`}
          />
        );
      })}
    </div>
  );
}

export default HeroList;

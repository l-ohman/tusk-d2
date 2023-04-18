import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHero } from "../../store";

export default function HeroList() {
  const allHeroes = useSelector((state) => state.matchupCalculator.allHeroes);
  const selectedHero = useSelector(state => state.matchupCalculator.selectedHero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedHero === {}) console.log("Selected hero is an empty object");
  }, [selectedHero])

  const [heroSearch, setHeroSearch] = useState("");
  const handleSearch = (value) => {
    setHeroSearch(value);
  }

  return (
    <>
      <div className="leftContainer">
        <input type="text" placeholder="Search heroname..." id="heroSearch" onChange={(e) => handleSearch(e.target.value)}/>
        <div className="heroIconsContainer">
          {Object.values(allHeroes).sort((a, b) => a.name > b.name ? 1 : -1).map((hero) => {
            return (
              <img
                key={hero.id}
                src={`assets/heroIcons/${hero.name.replaceAll(" ", "_")}_icon.webp`}
                alt={`${hero.name} icon`}
                onClick={hero.selectable ? () => dispatch(setSelectedHero(hero)) : () => alert(`${hero.name} is already picked/banned`)}
                className={`heroIconDraft${!hero.selectable ? " unselectable" : heroSearch.length <= 1 ? "" : hero.name.toLowerCase().includes(heroSearch.toLowerCase())? " matchSearch" : " doesNotMatchSearch"}`}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

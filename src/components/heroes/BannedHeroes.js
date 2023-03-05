import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function BannedHeroes() {
  const allHeroes = useSelector((state) => state.heroes);
  const bannedHeroIds = useSelector((state) => state.teams.banned);

  const [bannedHeroes, setBannedHeroes] = useState([]);
  useEffect(() => {
    setBannedHeroes(bannedHeroIds);
    console.log("updating heroes banned\n");
    console.log("!!!!!!!\n");
  }, [bannedHeroIds[bannedHeroIds.length - 1]]);

  return (
    <>
      <h3>Banned heroes</h3>
      <div className="heroIconsContainer">
        {bannedHeroes.map((heroId) => {
          const hero = allHeroes[heroId];
          return (
            <img
              key={heroId}
              src={`assets/heroIcons/${hero.name.replaceAll(" ", "_")}_icon.webp`}
              alt={`${hero.name} icon`}
              className={`heroIconDraft unselectable`}
            />
          );
        })}
      </div>
    </>
  );
}

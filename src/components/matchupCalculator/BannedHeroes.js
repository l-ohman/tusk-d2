import React from "react";
import { useSelector } from "react-redux";

export default function BannedHeroes() {
  const state = useSelector((state) => state);
  const bannedHeroes = Object.keys(state.matchupCalculator.teams.banned);

  return (
    <div id="bannedHeroesContainer">
      <h3>Banned heroes</h3>
      <div className="heroIconsContainer bans">
        {bannedHeroes.length ? bannedHeroes.map((heroId) => {
          const hero = state.matchupCalculator.allHeroes[heroId];
          return (
            <img
              key={heroId}
              src={`assets/heroIcons/${hero.name.replaceAll(
                " ",
                "_"
              )}_icon.webp`}
              alt={`${hero.name} icon`}
              className={`heroIconDraft banned`}
            />
          );
        }) : <p className="infoText">No heroes have been banned</p>}
      </div>
    </div>
  );
}

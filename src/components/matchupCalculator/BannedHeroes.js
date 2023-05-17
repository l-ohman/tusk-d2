import React from "react";
import { useSelector } from "react-redux";

export default function BannedHeroes() {
  const state = useSelector((state) => state);
  const team = state.matchupCalculator.teams.banned;
  const bannedHeroes = Object.keys(team.heroes).sort(
    (idA, idB) => team.heroes[idA] - team.heroes[idB]
  );

  return (
    <div id="bannedHeroesContainer">
      <h3>Banned Heroes</h3>
      <div className="heroIconsContainer bans">
        {bannedHeroes.length ? (
          bannedHeroes.map((heroId) => {
            const hero = state.matchupCalculator.allHeroes[heroId];
            return (
              <img
                key={heroId}
                src={`assets/heroIcons/${hero.name.replaceAll(
                  " ",
                  "_"
                )}_icon.webp`}
                alt={`${hero.name}`}
                className={`heroIconDraft banned`}
              />
            );
          })
        ) : (
          <p className="infoText">No heroes have been banned</p>
        )}
      </div>
    </div>
  );
}

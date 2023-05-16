import React from "react";

// temporarily not in use
export default function SingleHeroData({ hero }) {
  return (
    <div id="selectedHeroItem">
      <div>
        <h1>{hero.name.replaceAll("_", " ")}</h1>
        <p>{(hero.winrate * 100).toPrecision(4)}% winrate</p>
      </div>
      <img
        src={`assets/heroIcons/${hero.name.replaceAll(" ", "_")}_icon.webp`}
        alt={`${hero.name} icon`}
        className="heroSelected"
      />
    </div>
  );
}

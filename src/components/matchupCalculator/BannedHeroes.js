import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

export default function BannedHeroes() {
  // const state = useSelector((state) => state);

  return (
    <>
      <h3>Banned heroes</h3>
      {/* <div className="heroIconsContainer">
        {state.matchupCalculator.teams.banned.map((heroId) => {
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
        })}
      </div> */}
    </>
  );
}

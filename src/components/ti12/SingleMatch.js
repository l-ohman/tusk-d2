import React from "react";
import { heroNameById, heroIconById } from "../../lib";

export default function SingleMatch({ match }) {
  return (
    <div className="single-match">
      <Roster isRadiant={true} pickBans={match.pickBans} />
      <Roster isRadiant={false} pickBans={match.pickBans} />
    </div>
  );
}

function Roster({ isRadiant, pickBans }) {
  pickBans = pickBans.filter(
    (itm) => itm.isPick && itm.isRadiant === isRadiant
  );
  return (
    <div className="matchlist-roster">
      {pickBans?.map((hero, i) => {
        return (
          <div className="single-hero-roster" key={hero.heroId}>
            <img
              src={heroIconById(hero.heroId)}
              alt={heroNameById(hero.heroId)}
              className={
                isRadiant ? "hero-pick radiant-pick" : "hero-pick dire-pick"
              }
            />
          </div>
        );
      })}
    </div>
  );
}

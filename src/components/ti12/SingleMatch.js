import React from "react";
import { heroNameById, heroIconById } from "../../lib";

export default function SingleMatch({ match }) {
  return (
    <div className="single-match">
      <div className="team-draft radiant-draft">
        <Team team={match.radiantTeam} />
        <div className="pickBan-container">
          <Roster isRadiant={true} pickBans={match.pickBans} />
          <Roster isRadiant={true} pickBans={match.pickBans} isPick={false} />
        </div>
      </div>
      <MatchInfo />
      <div className="team-draft dire-draft">
        <Team team={match.direTeam} />
        <div className="pickBan-container">
          <Roster isRadiant={false} pickBans={match.pickBans} />
          <Roster isRadiant={false} pickBans={match.pickBans} isPick={false} />
        </div>
      </div>
    </div>
  );
}

function Team({ team }) {
  return (
    <div className="single-match-team">
      {/* <p>{team.name}</p> */}
      <img src={team.logo} alt={team.name} />
    </div>
  );
}

function Roster({ pickBans, isRadiant, isPick = true }) {
  pickBans = pickBans.filter(
    (itm) => itm.isPick === isPick && itm.isRadiant === isRadiant
  );
  const classNameByFilter = () => {
    if (isPick) {
      return isRadiant ? "hero-pick radiant-pick" : "hero-pick dire-pick";
    } else {
      return "hero-ban";
    }
  };
  return (
    <div className="matchlist-roster">
      {pickBans?.map((hero, i) => {
        return (
          <div className="single-hero-roster" key={hero.heroId}>
            <img
              src={heroIconById(hero.heroId)}
              alt={heroNameById(hero.heroId)}
              className={classNameByFilter()}
            />
          </div>
        );
      })}
    </div>
  );
}

function MatchInfo() {
  return <div>Match info</div>;
}

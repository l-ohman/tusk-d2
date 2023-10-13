import React from "react";
import { heroNameById, heroIconById, secondsToClockTime } from "../../lib";

export default function SingleMatch({ match }) {
  return (
    <div className="single-match">
      <div className="team-draft radiant-draft">
        <Team team={match.radiantTeam} wonGame={match.didRadiantWin} />
        <div className="pickBan-container">
          <Roster isRadiant={true} pickBans={match.pickBans} />
          <Roster isRadiant={true} pickBans={match.pickBans} isPick={false} />
        </div>
      </div>
      <MatchInfo match={match} />
      <div className="team-draft dire-draft">
        <Team team={match.direTeam} wonGame={!match.didRadiantWin} />
        <div className="pickBan-container">
          <Roster isRadiant={false} pickBans={match.pickBans} />
          <Roster isRadiant={false} pickBans={match.pickBans} isPick={false} />
        </div>
      </div>
    </div>
  );
}

function Team({ team, wonGame }) {
  return (
    <div className="single-match-team">
      {/* <p>{team.name}</p> */}
      <img
        src={team.logo}
        alt={team.name}
        className={
          "team-icon " + (wonGame ? "icon-match-winner" : "icon-match-loser")
        }
      />
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

function MatchInfo({ match }) {
  const matchWinner = match.didRadiantWin
    ? match.radiantTeam.name
    : match.direTeam.name;
  const date = new Date(match.startDateTime * 1000);
  return (
    <div className="match-info-basic">
      <h3>{secondsToClockTime(match.durationSeconds)}</h3>
      <p>
        <a
          href={`https://stratz.com/matches/${match.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Match on Stratz
        </a>
      </p>
      <p>{`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`}</p>
    </div>
  );
}

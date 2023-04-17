import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsQuestionCircle, BsQuestionCircleFill } from "react-icons/bs";

export default function MatchupHeroBreakdown({ hero, team, side }) {
  const teams = useSelector((state) => state.teams);
  const [displayDetails, setDisplayDetails] = useState(false);

  return (
    <div>
      <hr />
      <div className="heroInMatchupList">
        <img
          src={`assets/heroIcons/${hero.name.replaceAll(" ", "_")}_icon.webp`}
        />
        <p>{hero.name}</p>
        <p>
          {team === "Radiant" || side === "With"
            ? hero.synergyRating.toPrecision(4)
            : hero.counterRating.toPrecision(4)}
          {displayDetails ? (
            <BsQuestionCircleFill
              onClick={() => setDisplayDetails(false)}
              // onClick={() => console.log(hero)}
              size={12}
            />
          ) : (
            <BsQuestionCircle
              onClick={() => setDisplayDetails(true)}
              size={12}
            />
          )}
        </p>
      </div>

      {/*** MATCHUP DETAILS LIST ***/}

      {/* Iterate through Radiant heroes */}
      {displayDetails && (
        <div className="matchupDetails">
          {team === "Radiant"
            ? teams.radiant.map((radiantHero, idx) => {
                return (
                  <p key={idx}>{`Rating with ${radiantHero.name} — ${
                    hero.detailedSynergies.find(
                      (synergy) => synergy.heroId === radiantHero.id
                    )?.value
                  }`}</p>
                );
              })
            : teams.radiant.map((radiantHero, idx) => {
                return (
                  <p key={idx}>{`Rating against ${radiantHero.name} — ${
                    hero.detailedCounters.find(
                      (counters) => counters.heroId === radiantHero.id
                    )?.value
                  }`}</p>
                );
              })}

          {/* Iterate through Dire heroes */}
          {team === "Radiant"
            ? teams.dire.map((direHero, idx) => {
                return (
                  <p key={idx}>{`Rating against ${direHero.name} — ${
                    hero.detailedCounters.find(
                      (counter) => counter.heroId === direHero.id
                    )?.value
                  }`}</p>
                );
              })
            : teams.dire.map((direHero, idx) => {
                return (
                  <p key={idx}>{`Rating with ${direHero.name} — ${
                    hero.detailedSynergies.find(
                      (synergy) => synergy.heroId === direHero.id
                    )?.value
                  }`}</p>
                );
              })}
        </div>
      )}
    </div>
  );
}

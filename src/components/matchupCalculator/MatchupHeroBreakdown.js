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
            ? hero.radiantRating.toPrecision(4)
            : hero.direRating.toPrecision(4)}
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
                  <div className="matchupDetailsItem" key={idx}>
                    <img src={`assets/heroIcons/${radiantHero.name.replaceAll(" ", "_")}_icon.webp`}/>
                    <p>{`With ${radiantHero.name} — ${
                      hero.detailedSynergies.find(
                        (synergy) => synergy.heroId === radiantHero.id
                      )?.value
                    }`}</p>
                  </div>
                );
              })
            : teams.radiant.map((radiantHero, idx) => {
                return (
                  <div className="matchupDetailsItem" key={idx}>
                    <img src={`assets/heroIcons/${radiantHero.name.replaceAll(" ", "_")}_icon.webp`}/>
                    <p>{`Against ${radiantHero.name} — ${
                      hero.detailedCounters.find(
                        (counters) => counters.heroId === radiantHero.id
                      )?.value
                    }`}</p>
                  </div>
                );
              })}

          {/* Iterate through Dire heroes */}
          {team === "Radiant"
            ? teams.dire.map((direHero, idx) => {
                return (
                  <div className="matchupDetailsItem" key={idx}>
                    <img src={`assets/heroIcons/${direHero.name.replaceAll(" ", "_")}_icon.webp`}/>
                    <p>{`Against ${direHero.name} — ${
                      hero.detailedCounters.find(
                        (counter) => counter.heroId === direHero.id
                      )?.value
                    }`}</p>
                  </div>
                );
              })
            : teams.dire.map((direHero, idx) => {
                return (
                  <div className="matchupDetailsItem" key={idx}>
                    <img src={`assets/heroIcons/${direHero.name.replaceAll(" ", "_")}_icon.webp`}/>
                    <p>{`With ${direHero.name} — ${
                      hero.detailedSynergies.find(
                        (synergy) => synergy.heroId === direHero.id
                      )?.value
                    }`}</p>
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
}

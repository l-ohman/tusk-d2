import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsQuestionCircle, BsQuestionCircleFill } from "react-icons/bs";

export default function MatchupHeroBreakdown({ hero, team, side }) {
  const allHeroes = useSelector((state) => state.matchupCalculator.allHeroes);
  // const teams = useSelector((state) => state.matchupCalculator.teams);
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
            ? Object.keys(hero.detailedMatchups.radiant).map(
                (radiantHeroId) => {
                  const radiantHero = allHeroes[radiantHeroId];
                  const matchup = hero.detailedMatchups.radiant[radiantHeroId];
                  return (
                    <div className="matchupDetailsItem" key={radiantHeroId}>
                      <img
                        src={`assets/heroIcons/${radiantHero.name.replaceAll(
                          " ",
                          "_"
                        )}_icon.webp`}
                      />
                      <p>
                        {`${radiantHero.name}'s ${
                          matchup.with ? "Synergy With" : "Value Against"
                        } ${hero.name}: `}
                        <b>{matchup.difference}</b>
                      </p>
                    </div>
                  );
                }
              )
            : Object.keys(hero.detailedMatchups.dire).map((direHeroId) => {
                const direHero = allHeroes[direHeroId];
                const matchup = hero.detailedMatchups.dire[direHeroId];
                return (
                  <div className="matchupDetailsItem" key={direHeroId}>
                    <img
                      src={`assets/heroIcons/${direHero.name.replaceAll(
                        " ",
                        "_"
                      )}_icon.webp`}
                    />
                    <p>
                      {`${direHero.name}'s ${
                        matchup.with ? "Synergy With" : "Value Against"
                      } ${hero.name}: `}
                      <b>{matchup.difference}</b>
                    </p>
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
}

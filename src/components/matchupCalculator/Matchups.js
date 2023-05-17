import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsSortDown, BsSortUpAlt } from "react-icons/bs";
import MatchupHeroBreakdown from "./MatchupHeroBreakdown";

export default function Matchups({ team, update, side }) {
  const allHeroes = useSelector((state) => state.matchupCalculator.allHeroes);
  const selectedHero = useSelector(
    (state) => state.matchupCalculator.selectedHero
  );
  const [heroesSortedByValue, setHeroesSortedByValue] = useState([]);

  const [sortOrder, setSortOrder] = useState(false);
  const toggleSort = () => {
    setHeroesSortedByValue(heroesSortedByValue.reverse());
    setSortOrder(!sortOrder);
  };

  const sortMatchupValuesForDisplay = () => {
    const sortedHeroes = [];

    if (team === "Radiant" || side === "With") {
      // best picks for radiant
      for (const heroId in allHeroes) {
        if (!allHeroes[heroId].selectable) continue;
        sortedHeroes.push(allHeroes[+heroId]);
      }

      sortedHeroes.sort((a, b) => b.radiantRating - a.radiantRating);
    } else {
      // best picks for dire
      for (const heroId in allHeroes) {
        if (!allHeroes[heroId].selectable) continue;
        sortedHeroes.push(allHeroes[+heroId]);
      }

      sortedHeroes.sort((a, b) => a.direRating - b.direRating);
    }
    setHeroesSortedByValue(sortedHeroes);
  };

  useEffect(() => {
    if (update === true) {
      sortMatchupValuesForDisplay();
    }
  }, [update]);

  return (
    <div className="individualMatchupCont">
      <div className="matchupListHeader">
        <h3 className="teamRecommendationsHeader">
          {team
            ? `${sortOrder ? "Worst" : "Best"} Picks for ${team}`
            : `${sortOrder ? "Worst" : "Best"} ${side} ${selectedHero.name}`}
        </h3>
        {sortOrder ? (
          <BsSortDown onClick={toggleSort} size={20} />
        ) : (
          <BsSortUpAlt onClick={toggleSort} size={20} />
        )}
      </div>

      <div>
        {heroesSortedByValue.length ? (
          heroesSortedByValue.map((hero) => (
            <MatchupHeroBreakdown
              key={hero.id}
              hero={hero}
              team={team}
              side={side}
            />
          ))
        ) : (
          <>
            <hr id="infoTextDivider" />
            <p className="infoText">No heroes have been picked</p>
          </>
        )}
      </div>
    </div>
  );
}

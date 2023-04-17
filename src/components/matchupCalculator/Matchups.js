import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsSortDown, BsSortUpAlt } from "react-icons/bs";
import MatchupHeroBreakdown from "./MatchupHeroBreakdown";

export default function Matchups({ team, update, side }) {
  const allHeroes = useSelector((state) => state.heroes);
  const selectedHero = useSelector((state) => state.selectedHero);
  const [heroesSortedByValue, setHeroesSortedByValue] = useState([]);

  const [sortOrder, setSortOrder] = useState(false);
  const toggleSort = () => setSortOrder(!sortOrder);

  useEffect(() => {
    sortMatchupValuesForDisplay(sortOrder);
  }, [sortOrder]);

  const sortMatchupValuesForDisplay = (reverseOrder = false) => {
    const sortedHeroes = [];

    if (team === "Radiant" || side === "With") {
      // best picks for radiant
      for (const heroId in allHeroes) {
        if (!allHeroes[heroId].selectable) continue;
        else if (allHeroes[heroId].detailedSynergies.length === 0) continue;
        sortedHeroes.push(allHeroes[+heroId]);
      }

      sortedHeroes.sort((a, b) => b.synergyRating - a.synergyRating);
      if (reverseOrder) {
        sortedHeroes.reverse();
      }
    } else {
      // best picks for dire
      for (const heroId in allHeroes) {
        if (!allHeroes[heroId].selectable) continue;
        else if (allHeroes[heroId].detailedCounters.length === 0) continue;
        sortedHeroes.push(allHeroes[+heroId]);
      }

      sortedHeroes.sort((a, b) => a.counterRating - b.counterRating);
      if (reverseOrder) {
        sortedHeroes.reverse();
      }
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
        {heroesSortedByValue.map((hero) => (
          <MatchupHeroBreakdown
            key={hero.id}
            hero={hero}
            team={team}
            side={side}
          />
        ))}
      </div>
    </div>
  );
}

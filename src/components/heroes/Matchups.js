import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Matchups({ team, update }) {
  const allHeroes = useSelector((state) => state.heroes);
  // const teams = useSelector((state) => state.teams);

  const [heroesSortedByValue, setHeroesSortedByValue] = useState([]);

  // the 'against' boolean will determine sorting method of matchup data
  const sortMatchupValuesForDisplay = () => {
    // const draftedHeroes = [
    //   ...teams.radiant.map((hero) => hero.id),
    //   ...teams.dire.map((hero) => hero.id),
    // ];
    const sortedHeroes = [];

    if (team === "Radiant") {
      // best picks for radiant
      for (const heroId in allHeroes) {
        if (!allHeroes[heroId].selectable) continue;
        sortedHeroes.push(allHeroes[+heroId]);
      }
      sortedHeroes.sort((a, b) => b.synergyRating - a.synergyRating);
    } else {
      // best picks for dire
      for (const heroId in allHeroes) {
        if (!allHeroes[heroId].selectable) continue;
        sortedHeroes.push(allHeroes[+heroId]);
      }
      sortedHeroes.sort((a, b) => a.counterRating - b.counterRating);
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
      <h2 className="teamRecommendationsHeader">{`Best Picks for ${team}`}</h2>

      <div>
        {heroesSortedByValue.map((hero) => (
          <div key={hero.id}>
            <hr />
            <div className="heroInMatchupList">
              <img
                src={`assets/heroIcons/${hero.name.replaceAll(
                  " ",
                  "_"
                )}_icon.webp`}
              />
              <p>{hero.name}</p>
              <p>
                {team === "Radiant" ? hero.synergyRating : hero.counterRating}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

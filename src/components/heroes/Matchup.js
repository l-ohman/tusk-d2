import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Matchups({ team, against, data }) {
  const allHeroes = useSelector((state) => state.heroes);
  const teams = useSelector((state) => state.teams);

  const [sortedByValueWith, setSortedByValueWith] = useState([]);
  const [sortedByValueAgainst, setSortedByValueAgainst] = useState([]);

  // the 'against' boolean will determine sorting method of matchup data
  const sortMatchupValuesForDisplay = () => {
    const heroCount = teams.radiant.length + teams.dire.length;
    const draftedHeroes = [...teams.radiant.map(hero => hero.id), ...teams.dire.map(hero => hero.id)];
    // console.log(draftedHeroes);
    let sortedHeroes = [];

    if (!against) {
      // best picks for radiant
      for (const heroId in data) {
        if (draftedHeroes.includes(+heroId)) continue;
        sortedHeroes.push({
          id: heroId,
          name: allHeroes.find((item) => item.id === +heroId).name,
          value: (Number(data[heroId].winrateWith) / heroCount).toPrecision(4),
        });
      }
      sortedHeroes.sort((a, b) => (a.value < b.value ? 1 : -1));
      setSortedByValueWith(sortedHeroes);
    } else if (against) {
      // best bans for radiant
      for (const heroId in data) {
        if (draftedHeroes.includes(+heroId)) continue;
        sortedHeroes.push({
          id: heroId,
          name: allHeroes.find((item) => item.id === +heroId).name,
          value: (
            100 -
            Number(data[heroId].winrateAgainst) / heroCount
          ).toPrecision(4),
        });
      }
      sortedHeroes.sort((a, b) => (a.value < b.value ? 1 : -1));
      setSortedByValueAgainst(sortedHeroes);
    }
  };

  useEffect(() => {
    sortMatchupValuesForDisplay();
  }, [data]);

  return (
    <div className="individualMatchupCont">
      <h2>
        {`Best Picks for ${against ? "Dire" : "Radiant"}`}
      </h2>

      <div>
        {against
          ? sortedByValueAgainst.map((hero) => (
              <div key={hero.id}>
                <div className="heroInMatchupList">
                  <img
                    src={`assets/heroIcons/${hero.name.replaceAll(
                      " ",
                      "_"
                    )}_icon.webp`}
                  />
                  <p>{hero.name}</p>
                  <p>{hero.value}</p>
                </div>
                <hr />
              </div>
            ))
          : sortedByValueWith.map((hero) => (
              <div key={hero.id}>
                <div className="heroInMatchupList">
                  <img
                    src={`assets/heroIcons/${hero.name.replaceAll(
                      " ",
                      "_"
                    )}_icon.webp`}
                  />
                  <p>{hero.name}</p>
                  <p>{hero.value}</p>
                </div>
                <hr />
              </div>
            ))}
      </div>
    </div>
  );
}

export default Matchups;

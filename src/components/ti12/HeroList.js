import React, { useState, useMemo } from "react";
import allHeroes from "../../../server/heroes.json"; // xd
import { heroIconById, heroNameById } from "../../lib";
import { useSelector } from "react-redux";

// too many components/fns in one file -- to cleanup later

export default function HeroList() {
  const tiHeroes = useSelector((state) => state.ti12.allHeroes);
  let heroes = [];
  for (let heroId in tiHeroes) {
    heroes.push(tiHeroes[heroId]);
  }

  // "matches" | "wins" | "winrate" | "bans"
  const [sortCategory, setSortCategory] = useState("matches");
  const [sortHighLow, setSortHighLow] = useState(true);
  const updateSort = (category) => {
    if (category === sortCategory) {
      setSortHighLow(!sortHighLow);
    } else {
      setSortCategory(category);
      if (sortHighLow === false) setSortHighLow(true);
    }
  };

  const sortedHeroes = useMemo(() => {
    return sortHeroes(heroes, sortCategory, sortHighLow);
  }, [tiHeroes, sortCategory, sortHighLow]);

  const noPicks = useMemo(() => {
    return sortedHeroes.filter((hero) => hero.matchCount === 0);
  }, [tiHeroes]);
  const noBans = useMemo(() => {
    return sortedHeroes.filter((hero) => hero.banCount === 0);
  }, [tiHeroes]);

  const unpickBanned = useMemo(() => {
    const unpickedUnbanned = [];
    for (let hero of noPicks) {
      const val = noBans.find((h) => h.id === hero.id);
      if (val) unpickedUnbanned.push(hero);
    }
    return unpickedUnbanned;
  }, [tiHeroes]);

  return (
    <>
      <div id="unpickbanned-heroes">
        <SubHeroList header="Unpicked heroes" heroes={noPicks} />
        <SubHeroList header="Unbanned heroes" heroes={noBans} />
      </div>
      <SubHeroList header="Unpicked and unbanned" heroes={unpickBanned} />
      <hr className="list-divider" />
      <div id="sort-help-text">{sortHelpText(sortCategory, sortHighLow)}</div>
      <div id="full-hero-list">
        <table>
          <thead>
            <tr>
              <td>
                <p className="table-header-p">#</p>
              </td>
              <td>
                <p className="table-header-p">Hero</p>
              </td>
              <td>{/*Hero img*/}</td>
              <td>
                <p
                  className="table-header-p"
                  onClick={() => updateSort("matches")}
                >
                  Matches
                </p>
              </td>
              <td>
                <p
                  className="table-header-p"
                  onClick={() => updateSort("wins")}
                >
                  Wins
                </p>
              </td>
              <td>
                <p
                  className="table-header-p"
                  onClick={() => updateSort("winrate")}
                >
                  Winrate
                </p>
              </td>
              <td>
                <p
                  className="table-header-p"
                  onClick={() => updateSort("bans")}
                >
                  Bans
                </p>
              </td>
            </tr>
          </thead>
          <tbody>
            {sortedHeroes?.map((hero, idx) => (
              <tr key={hero.id}>
                <SingleHero hero={hero} idx={idx} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function SingleHero({ hero, idx }) {
  const name = allHeroes[hero.id].name;

  return (
    <>
      <td>{idx + 1}</td>
      <td>
        <img src={heroIconById(hero.id)} alt={heroNameById(hero.id)} />
      </td>
      <td>{name}</td>
      <td>{hero.matchCount}</td>
      <td>{hero.winCount}</td>
      <td>{(+hero.winrate).toFixed(2)}%</td>
      <td>{hero.banCount}</td>
    </>
  );
}

function sortHeroes(heroes, category, highLow) {
  const aMult = highLow ? -1 : 1;
  const bMult = aMult * -1;
  switch (category) {
    case "matches":
      return heroes.sort((a, b) => a.matchCount * aMult + b.matchCount * bMult);
    case "wins":
      return heroes.sort((a, b) => a.winCount * aMult + b.winCount * bMult);
    case "winrate":
      return heroes.sort((a, b) => a.winrate * aMult + b.winrate * bMult);
    case "bans":
      return heroes.sort((a, b) => a.banCount * aMult + b.banCount * bMult);
    default:
      return heroes;
  }
}

function sortHelpText(category, highLow) {
  const direction = highLow ? "high to low" : "low to high";
  return `Sorting by ${category} (${direction})`;
}

function SubHeroList({ header, heroes }) {
  return (
    <div className="herolist-container">
      <h2>
        {header}
        {` (${heroes.length})`}
      </h2>
      <div className="hero-list-img-container">
        {heroes.map((hero) => (
          <img src={heroIconById(hero.id)} alt={heroNameById(hero.id)} />
        ))}
      </div>
    </div>
  );
}

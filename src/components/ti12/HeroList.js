import React from "react";
import allHeroes from "../../../server/heroes.json"; // xd
import { heroIconById, heroNameById } from "../../lib";
import { useSelector } from "react-redux";

export default function HeroList() {
  const tiHeroes = useSelector((state) => state.ti12.allHeroes);
  let heroes = [];
  for (let heroId in tiHeroes) {
    heroes.push(tiHeroes[heroId]);
  }
  heroes.sort((a, b) => b.matchCount - a.matchCount);

  return (
    <>
      <div id="hello"></div>
      <div id="full-hero-list">
        <table>
          <thead>
            <tr>
              <td>
                <p className="table-header-p">Hero</p>
              </td>
              <td>{/*Hero img*/}</td>
              <td>
                <p className="table-header-p">Matches</p>
              </td>
              <td>
                <p className="table-header-p">Wins</p>
              </td>
              <td>
                <p className="table-header-p">Winrate</p>
              </td>
              <td>
                <p className="table-header-p">Bans</p>
              </td>
            </tr>
          </thead>
          <tbody>
            {heroes?.map((hero, i) => (
              <tr>
                <SingleHero hero={hero} key={hero.id} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function SingleHero({ hero }) {
  const name = allHeroes[hero.id].name;

  return (
    <>
      <td>
        <img src={heroIconById(hero.id)} alt={heroNameById(hero.id)} />
      </td>
      <td>{name}</td>
      <td>{hero.matchCount}</td>
      <td>{hero.winCount}</td>
      <td>{hero.winrate}</td>
      <td>{hero.banCount}</td>
    </>
  );
}

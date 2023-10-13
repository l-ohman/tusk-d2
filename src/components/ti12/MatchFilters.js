import React, { useState, useEffect } from "react";
import allHeroes from "../../../server/heroes.json"; // xd
import { heroIconById, heroNameById } from "../../lib";

// would like to be able to search based on versus/teams eventually
// currently just searches to see if a hero is in the match regardless of side

export default function MatchFilters({ matches, setMatches }) {
  const [teamAHeroes, setTeamAHeroes] = useState([]);
  // const [teamBHeroes, setTeamBHeroes] = useState([]);

  useEffect(() => {
    let updatedMatches = [];
    for (let heroId of teamAHeroes) {
      const newMatches = matches.filter((match) =>
        isHeroInMatch(match, heroId)
      );
      updatedMatches = [...updatedMatches, ...newMatches];
    }
    setMatches(updatedMatches);
  }, [teamAHeroes]);

  return (
    <div id="match-filters-container">
      <HeroFilters team="A" heroes={teamAHeroes} setHeroes={setTeamAHeroes} />
      {/* <HeroFilters team="B" heroes={teamBHeroes} setHeroes={setTeamBHeroes} /> */}
      <MatchDetails matchCount={matches.length} />
    </div>
  );
}

// Ability to select any number of heroes
function HeroFilters({ team, heroes, setHeroes }) {
  const [currentHero, setCurrentHero] = useState("");
  const selectHero = (e) => {
    const heroId = e.target.value;
    setCurrentHero(heroId);
  };
  const addHeroFilter = () => {
    // if (heroes.length === 5) return;
    setHeroes([...heroes, currentHero]);
    setCurrentHero("");
  };
  const clearHeroFilters = () => {
    setHeroes([]);
  };

  return (
    <>
      <div className="hero-selection-container">
        {/* <h3>Team {team}</h3> */}
        {/* hero selection */}
        <div>
          <select
            value={currentHero}
            onChange={selectHero}
            className="hero-selection"
          >
            <option value="" style={{ color: "black" }}>
              Select a hero
            </option>
            {Object.keys(allHeroes)?.map((heroId) => (
              <option value={heroId} key={heroId} style={{ color: "black" }}>
                {allHeroes[heroId].name}
              </option>
            ))}
          </select>
          <button onClick={addHeroFilter}>+</button>
          <button onClick={clearHeroFilters}>Clear all</button>
        </div>
        {/* display selected heroes */}
        <div>
          {heroes.map((heroId) => {
            return (
              <img
                src={heroIconById(+heroId)}
                alt={heroNameById(+heroId)}
                key={heroId}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function MatchDetails({ matchCount }) {
  return (
    <div>
      <p>{matchCount} matches found</p>
    </div>
  );
}

// util
const isHeroInMatch = (match, heroId) => {
  for (let pick of match.pickBans) {
    if (pick.isPick && pick.heroId == heroId) {
      return true;
    }
  }
  return false;
};

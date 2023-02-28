import React from "react";
import { useSelector } from "react-redux";

function Matchups({ team, against, data }) {
  const allHeroes = useSelector((state) => state.heroes);
  const teams = useSelector((state) => state.teams);
  // const thisTeam = teams[team];

  let heroCount = teams.radiant.length + teams.dire.length;

  const [sortedByValueWith, setSortedByValueWith] = React.useState([]);
  const [sortedByValueAgainst, setSortedByValueAgainst] = React.useState([]);

  // the 'against' boolean will determine sorting method of matchup data
  const sortMatchupValuesForDisplay = () => {
    if (!against) {
      // Best PICKS for Radiant
      let sortedHeroes = [];

      // makes a new object for each hero and pushes into an array
      for (let heroId in data) {
        let heroObj = {
          id: heroId,
          name: allHeroes.find((item) => item.id === +heroId).name,
          value: data[heroId].valueWith.toPrecision(4),
        };
        sortedHeroes.push(heroObj);
      }
      // sorts the array by value
      sortedHeroes.sort((a, b) => {
        if (+a.value < +b.value) return 1;
        else return -1;
      });

      setSortedByValueWith(sortedHeroes);
      // console.log('Sorted by "with" value', sortedHeroes);
    } else if (against) {
      // Best BANS for Radiant
      let sortedHeroes = [];

      // makes a new object for each hero and pushes into an array
      for (let heroId in data) {
        let heroObj = {
          id: heroId,
          name: allHeroes.find((item) => item.id === +heroId).name,
          value: data[heroId].valueAgainst.toPrecision(4),
        };
        sortedHeroes.push(heroObj);
      }
      // sorts the array by value
      sortedHeroes.sort((a, b) => {
        if (+a.value < +b.value) return 1;
        else return -1;
      });

      setSortedByValueAgainst(sortedHeroes);
      // console.log('Sorted by "against" value', sortedHeroes);
    }
  };

  React.useEffect(() => {
    console.log("sorting heroes...");
    sortMatchupValuesForDisplay();
    console.log("number of heroes selected: ", heroCount);
  }, [data]);

  return (
    <div className="individualMatchupCont">
      <h2>
        {against ? "Best Bans for " : "Best Picks for "}
        {team[0].toUpperCase() + team.slice(1)}
      </h2>

      <div>
        {/* {Should filter out heroes with 0, and group them at bottom} */}
        {against
          ? sortedByValueAgainst.map((hero) => {
              return (
                <>
                  <div className="heroInMatchupList">
                    <img src={`assets/heroIcons/${hero.name}_icon.webp`} />
                    <p>{hero.name}</p>
                    <p>{hero.value}</p>
                  </div>
                  <hr />
                </>
              );
            })
          : sortedByValueWith.map((hero) => {
              return (
                <>
                  <div className="heroInMatchupList">
                    <img src={`assets/heroIcons/${hero.name}_icon.webp`} />
                    <p>{hero.name}</p>
                    <p>{hero.value}</p>
                  </div>
                  <hr />
                </>
              );
            })}
      </div>
    </div>
  );
}

export default Matchups;

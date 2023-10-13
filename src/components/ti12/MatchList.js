import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import MatchFilters from "./MatchFilters";
import SingleMatch from "./SingleMatch";
const brokenARMatchId = 7378986342; // xd

export default function MatchList() {
  const allMatches = useSelector((state) => state.ti12.allMatches);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (allMatches.length > 0) setMatches(allMatches);
  }, [allMatches]);

  // automatically resets matches if the filters don't find anything
  useEffect(() => {
    if (matches.length === 0) {
      setMatches(allMatches);
    }
  }, [matches]);

  return (
    <div id="match-list-wrapper">
      <MatchFilters matches={matches} setMatches={setMatches} />
      <div id="match-list-container">
        {matches
          .filter((match) => match.id != brokenARMatchId)
          ?.map((match) => (
            <SingleMatch match={match} key={match.id} />
          ))}
      </div>
    </div>
  );
}

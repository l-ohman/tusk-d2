import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MatchFilters from "./MatchFilters";
import SingleMatch from "./SingleMatch";

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
        {matches?.map((match) => (
          <SingleMatch match={match} key={match.id} />
        ))}
      </div>
    </div>
  );
}

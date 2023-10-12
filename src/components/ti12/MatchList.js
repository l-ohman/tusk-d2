import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleMatch from "./SingleMatch";

export default function MatchList() {
  const allMatches = useSelector((state) => state.ti12.allMatches);
  console.log(allMatches);

  return (
    <div id="match-list-wrapper">
      <h2>Matches</h2>
      {/* todo: searching/filtering/etc */}
      <div id="match-list-container">
        {allMatches?.map((match, idx) => (
          <SingleMatch match={match} key={match.id} />
        ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { BsQuestionCircle, BsQuestionCircleFill } from "react-icons/bs";

export default function MatchupHeroBreakdown({ hero, team, side }) {
  const [displayDetails, setDisplayDetails] = useState(false);


  return (
    <div>
      <hr />
      <div className="heroInMatchupList">
        <img
          src={`assets/heroIcons/${hero.name.replaceAll(" ", "_")}_icon.webp`}
        />
        <p>{hero.name}</p>
        <p>
          {team === "Radiant" || side === "With"
            ? hero.synergyRating.toPrecision(4)
            : hero.counterRating.toPrecision(4)}
          {displayDetails ? (
            <BsQuestionCircleFill
              onClick={() => setDisplayDetails(false)}
              size={12}
            />
          ) : (
            <BsQuestionCircle
            onClick={() => setDisplayDetails(true)}
              size={12}
            />
          )}
        </p>
      </div>
      {displayDetails && <p>Details will go here</p>}
    </div>
  );
}

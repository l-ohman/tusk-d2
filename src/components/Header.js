import React from "react";
// import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div id="header">
      <div>
        <img src="/assets/dota.png" alt="Dota 2 Logo" />
        <div>
          <h1>Tusk</h1>
          <h4>Dota 2 Drafting Assistant</h4>
        </div>
      </div>
    </div>
  );
}

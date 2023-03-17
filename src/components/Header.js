import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div id="header">
      {/* <img src="/assets/dota.png" alt="Dota 2 Logo" /> */}
      <h1>Tusk — Dota 2 Drafting Assistant</h1>
      <div id="header-links">
        <Link to="/matchup-calculator">Matchup Calculator</Link>
        <Link to="/hero-matchups">Single Matchup Viewer</Link>
        <Link to="/build">Build Generator</Link>
      </div>
    </div>
  );
}

import React from "react";
import { FaGithubSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <div id="footer">
      <p>This project is a work in progress</p>
      <a
        href="https://github.com/l-ohman/tusk-d2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>View on Github</p>
        <FaGithubSquare size={24} />
      </a>
    </div>
  );
}

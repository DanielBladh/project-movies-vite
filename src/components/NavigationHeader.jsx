import React from "react";
import { Link } from "react-router-dom";

export default function NavigationHeader() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {/* Add more links for other sections */}
        </ul>
      </nav>
    </header>
  );
}

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PopularList from "./pages/PopularList";
import Detail from "./pages/Detail";
import NavigationHeader from "./components/NavigationHeader";

export const App = () => {
  const api_key = "d107cda141153c9e0bf3c99eed3ad06b";
  const apiToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTA3Y2RhMTQxMTUzYzllMGJmM2M5OWVlZDNhZDA2YiIsInN1YiI6IjY1NDhhZWNhNDFhNTYxMzM2ZDg1NWUxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.461z3IP-hy8w4eeZ4clKz_XlSzcBq8W4joA9gMcqoVw";

  return (
    <Router>
      <NavigationHeader /> {/* Include the navigation header */}
      <Routes>
        <Route path="/" element={<PopularList />} />
        <Route path="/movies/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
};

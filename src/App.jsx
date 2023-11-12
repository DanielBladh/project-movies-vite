import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PopularList from "./pages/PopularList";
import Detail from "./pages/Detail";
import NavigationHeader from "./components/NavigationHeader";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PopularList />} />
        <Route path="/movies/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
};

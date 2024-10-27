import React, { useEffect } from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieTimes from "./components/MovieTimes";
import TicketQR from "./components/TicketQR";
import MovieLayout from "./layout/MovieLayout";
import ReactGA from "react-ga4";
import { MovieProvider } from "./utils/MovieContext";

ReactGA.initialize("G-YG251Q2PLP");

function App() {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
    });
  });

  return (
    <div className="App">
      <MovieProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MovieLayout />}>
              <Route index element={<MovieList />} />
              <Route path="movie" element={<MovieList />} />
              <Route path="movieTimes/:name" element={<MovieTimes />} />
              <Route path="ticket" element={<TicketQR />} />
            </Route>
          </Routes>
        </Router>
      </MovieProvider>
    </div>
  );
}

export default App;

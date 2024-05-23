import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";

import App from "./App.jsx";
import Movie from "./pages/Movie.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";

import "./index.css";
import Watchlist from "./pages/Watchlist.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WatchlistProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="movie/:id" element={<Movie />} />
            <Route path="search" element={<Search />} />
            <Route path="watchlist" element={<Watchlist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WatchlistProvider>
  </React.StrictMode>
);

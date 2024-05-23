import React from "react";
import { useState, useEffect } from "react";

import { useWatchlist } from "../context/WatchlistContext";

import MovieCard from "../components/MovieCard";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Watchlist = () => {
  const { arrayWatchlist } = useWatchlist();
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  const getWatchlistMovies = async () => {
    try {
      const moviePromises = arrayWatchlist.map((id) =>
        fetch(`${moviesURL}${id}?${apiKey}`).then((response) => response.json())
      );

      const movieResults = await Promise.all(moviePromises);
      setWatchlistMovies(movieResults);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (arrayWatchlist.length > 0) {
      getWatchlistMovies();
    } else {
      setWatchlistMovies([]);
    }
  }, [arrayWatchlist]);

  return (
    <section className="px-4 md:px-16 my-16">
      <h2 className="text-3xl mb-12">My Watchlist</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-16">
        {watchlistMovies.length === 0 && <p>No movies in your watchlist.</p>}
        {watchlistMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default Watchlist;

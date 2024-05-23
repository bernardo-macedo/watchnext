import React from "react";
import { useState, useEffect } from "react";

import MovieCard from "./MovieCard";

const topMoviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const TopMovies = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      setTopMovies(data.results);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    const topURL = `${topMoviesURL}top_rated?${apiKey}`;

    getTopMovies(topURL);
  }, []);

  return (
    <section className="px-4 md:px-16 my-16">
      <h2 className="text-3xl mb-12">Top movies</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-16">
        {topMovies &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </section>
  );
};

export default TopMovies;

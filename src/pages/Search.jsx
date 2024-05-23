import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useWatchlist } from "../context/WatchlistContext";

import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();

  const [searchMovies, setSearchMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      setSearchMovies(data.results);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    const searchMoviesURL = `${searchURL}?${apiKey}&query=${query}`;

    getSearchedMovies(searchMoviesURL);
  }, [query]);

  return (
    <section className="px-4 md:px-16 my-16">
      <h2 className="text-3xl mb-12">Search: {query}</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-16">
        {searchMovies &&
          searchMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </section>
  );
};

export default Search;

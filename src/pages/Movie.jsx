import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useWatchlist } from "../context/WatchlistContext";

import { FaStar } from "react-icons/fa";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const moviesImageURL = import.meta.env.VITE_IMG;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { arrayWatchlist, handleWatchlist } = useWatchlist();

  const getMovie = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      setMovie(data);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    const movieURL = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieURL);
  }, []);

  return (
    <section className="p-16 grid md:grid-cols-[1fr,2fr] gap-16">
      {movie && (
        <>
          <img
            src={`${moviesImageURL}${movie.poster_path}`}
            alt=""
            className="rounded-lg object-cover"
          />
          <div className="flex flex-col gap-4">
            <button
              className="flex gap-2 items-center hover:opacity-50 text-amber-400"
              onClick={() => handleWatchlist(movie.id)}
            >
              {arrayWatchlist.includes(movie.id) ? (
                <>
                  <FaCircleMinus />
                  <span>Remove from watchlist</span>
                </>
              ) : (
                <>
                  <FaCirclePlus />
                  <span>Add to watchlist</span>
                </>
              )}
            </button>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <div className="flex gap-3">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="">
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <FaStar />
              {movie.vote_average.toFixed(1)}
            </div>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default Movie;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useWatchlist } from "../context/WatchlistContext";

import { FaStar } from "react-icons/fa";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";

const moviesImageURL = import.meta.env.VITE_IMG;

const MovieCard = ({ movie }) => {
  const { arrayWatchlist, handleWatchlist } = useWatchlist();

  return (
    <div>
      <img
        src={`${moviesImageURL}${movie.poster_path}`}
        alt=""
        className="rounded-lg object-cover"
      />
      <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
        <Link
          to={`/movie/${movie.id}`}
          className="text-sm md:text-md hover:opacity-50"
        >
          <h3 className="">{movie.title}</h3>
          <div className="flex items-center gap-1">
            <FaStar />
            {movie.vote_average.toFixed(1)}
          </div>
        </Link>
        <button
          className="flex gap-2 items-center hover:opacity-50 text-amber-400"
          onClick={() => handleWatchlist(movie.id)}
        >
          {arrayWatchlist.includes(movie.id) ? (
            <>
              <FaCircleMinus />
              <span className="md:hidden">Remove from watchlist</span>
            </>
          ) : (
            <>
              <FaCirclePlus />
              <span className="md:hidden">Add to watchlist</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

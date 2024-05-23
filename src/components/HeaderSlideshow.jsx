import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useWatchlist } from "../context/WatchlistContext";

import { FaStar } from "react-icons/fa";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const moviesTrendingURL = import.meta.env.VITE_TRENDING;
const moviesImageURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;

const HeaderSlideshow = () => {
  const { arrayWatchlist, handleWatchlist } = useWatchlist();
  const [trendingMovies, setTrendingMovies] = useState([]);

  const getTrendingMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      setTrendingMovies(data.results);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    const trendingURL = `${moviesTrendingURL}?${apiKey}`;

    getTrendingMovies(trendingURL);
  }, []);

  return (
    <header>
      <h2 className="text-3xl px-16 my-12">Trending</h2>
      <Swiper
        slidesPerView={"2"}
        centeredSlides={true}
        spaceBetween={window.screen.width > 768 ? 20 : 10}
        loop={true}
        className="mySwiper"
      >
        {trendingMovies &&
          trendingMovies.map((movie) => (
            <SwiperSlide key={movie.id} className="flex flex-col gap-3 w-1/3">
              <img
                src={`${moviesImageURL}${
                  window.screen.width > 768
                    ? movie.backdrop_path
                    : movie.poster_path
                }`}
                alt=""
                className=" object-cover object-top max-h-96 rounded-lg"
              />
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <Link to={`/movie/${movie.id}`} className=" hover:opacity-50">
                  <h3 className="text-sm md:text-lg font-bold">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <FaStar />
                    {movie.vote_average.toFixed(1)}
                  </div>
                </Link>
                <button
                  className="flex gap-2 items-center hover:opacity-50 text-amber-400 text-start"
                  onClick={() => handleWatchlist(movie.id)}
                >
                  {arrayWatchlist.includes(movie.id) ? (
                    <>
                      <FaCircleMinus className="hidden md:block" />
                      <span>Remove from watchlist</span>
                    </>
                  ) : (
                    <>
                      <FaCirclePlus className="hidden md:block" />
                      <span>Add to watchlist</span>
                    </>
                  )}
                </button>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </header>
  );
};

export default HeaderSlideshow;

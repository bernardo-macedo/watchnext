import React, { createContext, useContext, useState, useEffect } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [arrayWatchlist, setArrayWatchlist] = useState(() => {
    // Load initial state from localStorage
    const savedWatchlist = localStorage.getItem("arrayWatchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  useEffect(() => {
    // Save arrayWatchlist to localStorage whenever it changes
    localStorage.setItem("arrayWatchlist", JSON.stringify(arrayWatchlist));
  }, [arrayWatchlist]);

  const handleWatchlist = (id) => {
    setArrayWatchlist((prevArrayWatchlist) => {
      if (prevArrayWatchlist.includes(id)) {
        return prevArrayWatchlist.filter((item) => item !== id);
      } else {
        return [...prevArrayWatchlist, id];
      }
    });
  };

  return (
    <WatchlistContext.Provider value={{ arrayWatchlist, handleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  return useContext(WatchlistContext);
};

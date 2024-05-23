import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { TbEyeHeart } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    } else {
      navigate(`/search?q=${search}`);
      setSearch("");
    }
  };

  return (
    <nav className="py-6 px-4 md:px-16 bg-slate-900">
      <div className=" flex justify-between items-center">
        <Link to="/">
          <h2 className="text-lg font-bold">WatchNext</h2>
        </Link>
        <form
          className="hidden md:flex items-center gap-1"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search"
            className=" border bg-slate-800 border-x-stone-400 rounded px-4 py-1"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button type="submit" className=" hover:opacity-50">
            <FaSearch className=" w-6 h-auto" />
          </button>
        </form>
        <div className="items-center">
          <Link to="/watchlist/" className=" hover:opacity-50">
            <TbEyeHeart className=" w-8 h-auto" />
          </Link>
        </div>
      </div>
      <div className="md:hidden mt-3">
        <form
          className="w-full flex items-center gap-1"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search"
            className=" border bg-slate-800 border-x-stone-400 rounded px-4 py-2 w-full"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button type="submit" className=" hover:opacity-50">
            <FaSearch className=" w-6 h-auto" />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;

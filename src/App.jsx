import { Link, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeaderSlideshow from "./components/HeaderSlideshow";
import TopMovies from "./components/TopMovies";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}

export default App;

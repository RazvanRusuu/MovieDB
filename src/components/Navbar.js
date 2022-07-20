import React from "react";
import { Link } from "react-router-dom";

import { BiMenu } from "react-icons/bi";
import SearchForm from "./SearchForm";
import classes from "./Navbar.module.css";
import { useMovieContext } from "../store/context";

const Navbar = () => {
  const { openSidebar } = useMovieContext();

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <span className={classes.logo}>
          Omdb <span>Api</span>
        </span>
        <ul className={classes.links}>
          <li>
            <Link className={classes.link} to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className={classes.link} to={"/favourite"}>
              Favorite
            </Link>
          </li>
        </ul>
        <button
          className={classes["btn-toggle"]}
          type="button"
          onClick={openSidebar}
        >
          <BiMenu />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;

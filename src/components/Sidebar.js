import React from "react";
import { Link } from "react-router-dom";

import { AiOutlineClose } from "react-icons/ai";
import { useMovieContext } from "../store/context";

import classes from "./Sidebar.module.css";
const Sidebar = () => {
  const { isSidebarOpen, openSidebar, closeSidebar } = useMovieContext();

  return (
    <aside className={`${classes.aside} ${isSidebarOpen ? classes.show : ""}`}>
      <header className={classes.header}>
        <div className="logo-box">
          <span className={classes.logo}>
            Omdb <span>Api</span>
          </span>
        </div>

        <button
          className={classes["btn-toggle"]}
          type="button"
          onClick={closeSidebar}
        >
          <AiOutlineClose />
        </button>
      </header>

      <nav className={classes.nav}>
        <ul>
          <li>
            <Link to={"/home"} onClick={closeSidebar}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/favorites"} onClick={closeSidebar}>
              Favorites
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

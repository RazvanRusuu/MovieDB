import React, { useEffect } from "react";

import { useMovieContext } from "../store/context";
import classes from "./Favorite.module.css";

const Favorite = () => {
  const { favorite, addToFavoritesHandler } = useMovieContext();

  return (
    <section className={classes.favorite}>
      <div className="container grid grid-autofit"></div>
    </section>
  );
};

export default Favorite;

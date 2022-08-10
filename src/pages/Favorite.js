import React, { useEffect } from "react";
import Movie from "../components/Movie";

import { useMovieContext } from "../store/context";
import classes from "./Favorite.module.css";

const Favorite = () => {
  const { favorites } = useMovieContext();

  return (
    <section className={classes.favorite}>
      <div className="container grid grid-autofill u-margin-top-large">
        {favorites.map((movie) => {
          const { id, title, poster } = movie;
          return <Movie key={id} title={title} poster={poster} id={id} />;
        })}
      </div>
    </section>
  );
};

export default Favorite;

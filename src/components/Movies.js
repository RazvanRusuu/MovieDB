import React, { useEffect } from "react";

import classes from "./Movies.module.css";
import { useMovieContext } from "../store/context";
import Movie from "./Movie";
import Loading from "../components/Loading";

const Movies = () => {
  const { movies, isLoading } = useMovieContext();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className={classes.movies}>
      <div className="container grid grid-autofit">
        {movies.map((movie) => {
          const { imdbID: id, Title, Poster, Year, Type } = movie;
          return (
            <Movie
              key={id}
              title={Title}
              poster={Poster}
              year={Year}
              type={Type}
              id={id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Movies;

import React, { useEffect } from "react";

import classes from "./Movies.module.css";
import { useMovieContext } from "../store/context";
import Movie from "./Movie";
import Loading from "../components/Loading";

const Movies = () => {
  const { movies, isLoading, favorites, addToFavoritesHandler, touched } =
    useMovieContext();

  const setLocalStorage = () =>
    localStorage.setItem("movies", JSON.stringify(favorites));

  useEffect(() => {
    const moviesInLocalStorage = localStorage.getItem("movies");
    const savedMoviesInLocalStorage = moviesInLocalStorage
      ? JSON.parse(moviesInLocalStorage)
      : [];
    addToFavoritesHandler(savedMoviesInLocalStorage);
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      setLocalStorage();
    }
    if (favorites.length === 0 && touched) {
      setLocalStorage();
    }
  }, [favorites]);

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

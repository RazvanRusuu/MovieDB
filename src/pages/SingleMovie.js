import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useMovieContext } from "../store/context";
import classes from "./SingleMovie.module.css";
import Loading from "../components/Loading";

const SingleMovie = () => {
  const { movieId } = useParams();
  const { fetchSingleMovie, singleMovieLoading, singleMovieError, movie } =
    useMovieContext();

  const {
    Actors: actors,
    Country,
    Genre,
    Director,
    Language,
    Plot,
    Poster: img,
    Released,
    Runtime,
    Writer,
    imdbRating,
    Title,
  } = movie;

  const src =
    img === "N/A"
      ? "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"
      : img;

  useEffect(() => {
    fetchSingleMovie(movieId);
  }, [movieId]);

  if (singleMovieLoading) {
    return <Loading />;
  }

  return (
    <section className={classes["single-movie"]}>
      {singleMovieError && (
        <h2 className=" heading-secondary center">No movie found!</h2>
      )}
      <div className="container grid grid-2--cols">
        <figure>
          <img className={classes.img} src={src} alt={Title} />
        </figure>
        <article className={classes.info}>
          <h2 className="heading-secondary u-margin-bottom-medium">{Title}</h2>
          <div>
            <p>{Plot}</p>
            <span>Actors: {actors}</span>
            <span>Director: {Director}</span>
            <span>Writer: {Writer}</span>
            <span>Released: {Released}</span>
            <span>Time: {Runtime}</span>
            <span>Rating: {imdbRating}</span>
            <span>Country: {Country}</span>
            <span>Language: {Language}</span>
            <span>Genre: {Genre}</span>
          </div>
        </article>
      </div>
    </section>
  );
};

export default SingleMovie;

import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { useMovieContext } from "../store/context";
import classes from "./Movie.module.css";

const Movie = (props) => {
  const { addToFavoritesHandler, favorites, movies } = useMovieContext();

  const existingFavoriteMovie = favorites.find((movie) => {
    const { id } = movie;
    return id === props.id;
  });

  const addFavorite = () => {
    const { id, title, poster } = props;
    addToFavoritesHandler({ id, title, poster });
  };

  // fallback for N/A photo
  const src =
    props.poster === "N/A"
      ? "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"
      : props.poster;

  return (
    <figure className={classes.figure}>
      <Link to={`/movies/${props.id}`} className={classes.movie}>
        <img className={classes.img} src={src} alt={props.title} />
      </Link>

      <div className={classes.info}>
        <h3 className="heading-tertiary">{props.title}</h3>
        <span className={classes.year}>{props.year}</span>
      </div>
      <button
        className={`btn ${classes["btn-favorite"]}`}
        title="add to favorite"
        onClick={addFavorite}
      >
        {existingFavoriteMovie ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
    </figure>
  );
};

export default Movie;

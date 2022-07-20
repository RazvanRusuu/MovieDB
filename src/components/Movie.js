import React from "react";

import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import classes from "./Movie.module.css";

const Movie = (props) => {
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
      >
        <AiOutlineHeart />
      </button>
    </figure>
  );
};

export default Movie;

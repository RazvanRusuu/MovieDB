import React from "react";

import classes from "./SearchForm.module.css";
import { useMovieContext } from "../store/context";

const SearchForm = () => {
  const {
    query,
    changeInputHandler,
    error: { msg, show: showErr },
  } = useMovieContext();

  const onChangeHandler = (e) => {
    changeInputHandler(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes["form-controls"]}>
        <input
          type="text"
          placeholder="search"
          className={classes.input}
          onChange={onChangeHandler}
          value={query}
        />
        {showErr && <p className={classes.error}>{msg}</p>}
      </div>
    </form>
  );
};

export default SearchForm;

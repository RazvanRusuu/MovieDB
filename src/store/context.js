import React, { useContext, useEffect, useReducer } from "react";

import reducer from "../reducer/reducer";
import { URL_API as url } from "../utilities";

const initialState = {
  isSidebarOpen: false,
  isLoading: false,
  singleMovieLoading: false,
  singleMovieError: null,
  movie: {},
  error: {
    show: false,
    msg: "",
  },
  movies: [],
  query: "top gun",
  favorites: [],
  touched: false,
};

const MovieContext = React.createContext({
  isSideBarOpen: null,
  openSideBar: () => {},
});

const MovieProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchMovies = async (url) => {
    dispatch({ type: "LOAD_MOVIES" });

    try {
      const response = await fetch(`${url}`);
      if (!response.ok) {
        throw new Error("Could not fetch movie");
      }

      const data = await response.json();

      if (data.Response === "True") {
        dispatch({ type: "MOVIES_SUCCESS", payload: data.Search });
      } else {
        throw new Error(data.Error);
      }
    } catch (error) {
      dispatch({ type: "MOVIES_ERROR", payload: error.message });
    }
  };

  const fetchSingleMovie = async (id) => {
    dispatch({ type: "LOAD_SINGLE_MOVIE" });
    try {
      const response = await fetch(`${url}&i=${id}`);
      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error);
      } else {
        dispatch({ type: "SINGLE_MOVIE_SUCCESS", payload: data });
      }
    } catch (error) {
      dispatch({ type: "SINGLE_MOVIE_ERROR", payload: error.message });
    }
  };

  const openSidebar = () => {
    dispatch({ type: "OPEN_SIDEBAR" });
  };

  const closeSidebar = () => {
    dispatch({ type: "CLOSE_SIDEBAR" });
  };

  const changeInputHandler = (query) => {
    dispatch({ type: "TYPING", payload: query });
  };

  const addToFavoritesHandler = (movie) => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: movie });
  };

  const { query } = state;

  useEffect(() => {
    fetchMovies(`${url}&s=${query}`);
  }, [query]);

  return (
    <MovieContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        changeInputHandler,
        fetchSingleMovie,
        addToFavoritesHandler,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;

export const useMovieContext = () => {
  return useContext(MovieContext);
};

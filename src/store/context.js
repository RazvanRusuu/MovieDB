import React, { useContext, useEffect, useReducer } from "react";

import { URL_API as url } from "../utilities";

const movieReducer = (state, action) => {
  if (action.type === "OPEN_SIDEBAR") {
    return { ...state, isSidebarOpen: true };
  }

  if (action.type === "CLOSE_SIDEBAR") {
    return { ...state, isSidebarOpen: false };
  }

  if (action.type === "LOAD_MOVIES") {
    return { ...state, error: { ...state.error }, isLoading: true };
  }

  if (action.type === "MOVIES_SUCCESS") {
    return {
      ...state,
      error: {
        show: false,
        msg: "",
      },
      movies: action.payload,
      isLoading: false,
    };
  }

  if (action.type === "MOVIES_ERROR") {
    return {
      ...state,
      movies: [],
      isLoading: false,
      error: { show: true, msg: action.payload },
    };
  }

  if (action.type === "LOAD_SINGLE_MOVIE") {
    return { ...state, error: { ...state.error }, singleMovieLoading: true };
  }

  if (action.type === "SINGLE_MOVIE_SUCCESS") {
    return {
      ...state,
      error: { ...state.error },
      movie: action.payload,
      singleMovieLoading: false,
      singleMovieError: false,
    };
  }

  if (action.type === "SINGLE_MOVIE_ERROR") {
    return {
      ...state,
      singleMovieError: true,
      error: { ...state.error },
      singleMovieLoading: false,
    };
  }

  if (action.type === "TYPING") {
    return { ...state, query: action.payload };
  }

  return state;
};

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
};

const MovieContext = React.createContext({
  isSideBarOpen: null,
  openSideBar: () => {},
});

const MovieProvider = (props) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

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

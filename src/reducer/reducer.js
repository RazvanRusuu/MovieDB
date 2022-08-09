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
      movies: [...action.payload],
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

  if (action.type === "ADD_TO_FAVORITES") {
    // set local storage to favorites array when the app renders for 1st time
    if (Array.isArray(action.payload)) {
      return {
        ...state,
        error: { ...state.error },
        favorites: [...action.payload],
      };
    }
    const existingMovie = state.favorites.find(
      (movie) => movie.id === action.payload.id
    );

    if (!existingMovie) {
      return {
        ...state,
        error: { ...state.error },
        favorites: [...state.favorites, action.payload],
      };
    } else {
      const updateFavorites = state.favorites.filter(
        (movie) => movie.id !== action.payload.id
      );
      return {
        ...state,
        error: { ...state.error },
        favorites: [...updateFavorites],
      };
    }
  }

  if (action.type === "TYPING") {
    return { ...state, query: action.payload };
  }

  return state;
};

export default movieReducer;

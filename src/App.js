import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useMovieContext } from "./store/context";
import Home from "./pages/Home";
import SingleMovie from "./pages/SingleMovie";
import Favorite from "./pages/Favorite";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const { favorites, addToFavoritesHandler } = useMovieContext();

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
    setLocalStorage();
  }, [favorites]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies/:movieId" element={<SingleMovie />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
    </>
  );
}

export default App;

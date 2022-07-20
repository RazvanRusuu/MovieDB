import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import SingleMovie from "./pages/SingleMovie";
import Favorite from "./pages/Favorite";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:movieId" element={<SingleMovie />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </>
  );
}

export default App;

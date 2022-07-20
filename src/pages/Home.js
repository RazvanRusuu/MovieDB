import React from "react";

import Movies from "../components/Movies";
import SearchForm from "../components/SearchForm";

const Home = () => {
  return (
    <main>
      <SearchForm />
      <Movies />
    </main>
  );
};

export default Home;

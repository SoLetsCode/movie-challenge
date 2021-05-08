import React, { useState } from "react";

import { Container } from "@material-ui/core";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [nominated, setNominated] = useState([]);
  const [search, setSearch] = useState("Please search for movies");

  return (
    <div>
      <SearchBar setMovies={setMovies} setSearch={setSearch} />
      <Container>
        {search}
        {movies.map((movie) => (
          <MovieCard title={movie.Title} year={movie.Year} src={movie.Poster} />
        ))}
      </Container>
      <Container>
        {nominated.map((movie) => (
          <MovieCard title={movie.Title} year={movie.Year} src={movie.Poster} />
        ))}
      </Container>
    </div>
  );
}

import React, { useState } from "react";

import { Container, Grid } from "@material-ui/core";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [nominated, setNominated] = useState([]);
  const [search, setSearch] = useState("Please search for movies");

  const nominateClick = (imdbID) => {
    if (nominated.length === 5) {
      //tell user that they have reached the max
    }

    if (nominated.length < 5) {
      let movie = movies.find((item) => item.imdbID === imdbID);
      setNominated([...nominated, movie]);
    }
  };

  return (
    <div>
      <Grid container xs={12} item justify="center">
        <SearchBar setMovies={setMovies} setSearch={setSearch} />
      </Grid>
      <Grid container xs={12} item justify="center">
        <Grid container item xs={6}>
          <Container>
            {search}
            {movies.map((movie) => (
              <MovieCard
                title={movie.Title}
                year={movie.Year}
                src={movie.Poster}
                imdbID={movie.imdbID}
                nominateClick={nominateClick}
              />
            ))}
          </Container>
        </Grid>
        <Grid container item xs={6}>
          <Container>
            {"Nominated"}
            {nominated.map((movie) => (
              <MovieCard
                title={movie.Title}
                year={movie.Year}
                src={movie.Poster}
              />
            ))}
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

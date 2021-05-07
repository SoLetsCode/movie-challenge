import React, { useState } from "react";
import axios from "axios";

import { Button, Container, TextField } from "@material-ui/core";
import MovieCard from "./components/MovieCard";

export default function App() {
  const [movies, setMovies] = useState([]);

  const API_KEY =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_KEY
      : process.env.REACT_APP_GH_API_KEY;
  const URL = "https://www.omdbapi.com";
  const PARAMS = `?apikey=${API_KEY}&type=movie`;

  const searchSubmit = (e) => {
    e.preventDefault();
    const search = e.target.title.value;
    axios
      .get(`${URL}${PARAMS}&s=${search}`)
      .then((res) => {
        if (res.data.Response === "False") {
          //no movie found
          console.log("MOVIE NOT FOUND");
        }

        if (res.data?.Search) {
          setMovies(res.data.Search);
          console.log(res.data.Search);
        }

        e.target.title.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Container>
        <form
          noValidate
          autoComplete="off"
          id="searchForm"
          onSubmit={searchSubmit}
        >
          <TextField label="Search" name="title" variant="outlined" />
        </form>
        <Button
          type="submit"
          variant="contained"
          form="searchForm"
          color="primary"
        >
          Search
        </Button>
      </Container>
      {/* Poster:
      "https://m.media-amazon.com/images/M/MV5BMTQ5MjYxMjkwOV5BMl5BanBnXkFtZTgwODE3MjY0MzE@._V1_SX300.jpg"
      Title: "Hello Ladies: The Movie" Type: "movie" Year: "2014" imdbID:
      "tt3762944" */}
      <Container>
        {movies.map((movie) => (
          <MovieCard title={movie.Title} year={movie.Year} src={movie.Poster} />
        ))}
        {/* <MovieCard
          title="Hello Ladies: The Movie"
          year="2014"
          src="https://m.media-amazon.com/images/M/MV5BMTQ5MjYxMjkwOV5BMl5BanBnXkFtZTgwODE3MjY0MzE@._V1_SX300.jpg"
        /> */}
      </Container>
    </div>
  );
}

import React, { useState } from "react";

import { Container, Grid } from "@material-ui/core";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import Dialog from "./components/Dialog";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [nominated, setNominated] = useState([]);
  const [search, setSearch] = useState("Please search for movies");
  const [dialogOpen, setDialogOpen] = useState(false);

  const nominateClick = (imdbID) => {
    if (nominated.length >= 4) {
      //tell user that they have reached the max
      dialogToggle();
    }

    if (nominated.length < 5) {
      let movie = movies.find((item) => item.imdbID === imdbID);
      setNominated([...nominated, movie]);
    }
  };

  const nominatedCheck = (imdbID) => {
    let result = nominated.some((movie) => movie.imdbID === imdbID);
    return result;
  };

  const removeClick = (imdbID) => {
    //find index of movie
    //remove movie from array
    debugger;
    let index = nominated.findIndex((item) => item.imdbID === imdbID);
    let newArray = [...nominated];
    newArray.splice(index, 1);
    setNominated(newArray);
  };

  const dialogToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <div>
      <Grid container justify="center">
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
                buttonClick={nominateClick}
                buttonTitle={"Nominate"}
                nominated={nominatedCheck(movie.imdbID)}
                key={movie.imdbID + "search"}
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
                imdbID={movie.imdbID}
                buttonClick={removeClick}
                buttonTitle={"Remove"}
                key={movie.imdbID + "nominated"}
              />
            ))}
          </Container>
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        toggle={dialogToggle}
        title="Thank you for nominating"
        text="You reached the max of 5 movie nominations. To add another movie you will need to remove one"
      />
    </div>
  );
}

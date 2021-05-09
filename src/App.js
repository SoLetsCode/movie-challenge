import React, { useState, useEffect } from "react";

import { Typography, Grid } from "@material-ui/core";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import Dialog from "./components/Dialog";
import Toast from "./components/Toast";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [nominated, setNominated] = useState(
    JSON.parse(localStorage.getItem("nominatedList")) || []
  );
  const [search, setSearch] = useState("Please search for movies");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    localStorage.setItem("nominatedList", JSON.stringify(nominated));
  }, [nominated]);

  const nominateClick = (imdbID) => {
    if (nominated.length >= 4) {
      //tell user that they have reached the max
      dialogToggle();
    }

    if (nominated.length < 5) {
      let movie = movies.find((item) => item.imdbID === imdbID);
      setToastOpen(true);
      setToastType("success");
      setToastText(`Movie "${movie.Title}" added`);
      setNominated([...nominated, movie]);
    }
  };

  const nominatedCheck = (imdbID) => {
    let result = nominated.some((movie) => movie.imdbID === imdbID);
    return result;
  };

  const removeClick = (imdbID) => {
    let index = nominated.findIndex((item) => item.imdbID === imdbID);
    let movieName = nominated[index].Title;

    let newArray = [...nominated];
    newArray.splice(index, 1);
    setNominated(newArray);
    setToastOpen(true);
    setToastType("error");
    setToastText(`Movie "${movieName}" removed`);
  };

  const dialogToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  const toastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };

  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        The Shoppies
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchBar setMovies={setMovies} setSearch={setSearch} />
        </Grid>
        <Grid item xs={6} align="center">
          <Typography variant="h5" gutterBottom>
            {search}
          </Typography>
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
        </Grid>
        <Grid item xs={6} align="center">
          <Typography variant="h5" gutterBottom>
            {"Nominated"}
          </Typography>
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
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        toggle={dialogToggle}
        title="Thank you for nominating"
        text="You reached the max of 5 movie nominations. To add another movie you will need to remove one"
      />
      <Toast
        open={toastOpen}
        toastClose={toastClose}
        type={toastType}
        duration={2000}
        text={toastText}
      />
    </div>
  );
}

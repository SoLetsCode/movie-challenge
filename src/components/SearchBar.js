import React from "react";
import axios from "axios";

import { Button, Container, TextField, Grid } from "@material-ui/core";

function SearchBar({ setMovies, setSearch }) {
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
          setSearch(`No movies found that contain "${e.target.title.value}"`);
          setMovies([]);
        }

        if (res.data?.Search) {
          setSearch(`Results for "${e.target.title.value}"`);
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
    <Container>
      <form
        noValidate
        autoComplete="off"
        id="searchForm"
        onSubmit={searchSubmit}
      >
        <Grid container justify="center">
          <Grid container item xs={3}>
            <TextField label="Search" name="title" variant="outlined" />
          </Grid>
          <Grid container item xs={3}>
            <Button
              type="submit"
              variant="contained"
              form="searchForm"
              color="primary"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SearchBar;

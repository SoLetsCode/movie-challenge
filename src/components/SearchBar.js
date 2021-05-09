import React, { useState } from "react";
import axios from "axios";

import { Button, TextField, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    height: "100%",
  },
});

function SearchBar({ setMovies, setSearch }) {
  const [input, setInput] = useState("");

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
        e.target.reset();
        setInput("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const classes = useStyles();

  return (
    <form noValidate autoComplete="off" id="searchForm" onSubmit={searchSubmit}>
      <Grid container>
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="Search"
            name="title"
            variant="outlined"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Please use at least 3 letters/numbers"
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            form="searchForm"
            color="primary"
            disabled={input.length < 3}
            size="large"
            className={classes.button}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SearchBar;

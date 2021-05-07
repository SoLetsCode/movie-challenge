import React from "react";
import axios from "axios";

import { Button, Container, TextField } from "@material-ui/core";

export default function App() {
  const API_KEY =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_KEY
      : process.env.REACT_APP_GH_API_KEY;
  const URL = "https://www.omdbapi.com";
  const PARAMS = `?apikey=${API_KEY}&type=movie&s=`;

  const searchSubmit = (e) => {
    e.preventDefault();
    const search = e.target.title.value;
    axios
      .get(`${URL}${PARAMS}${search}`)
      .then((res) => {
        if (res.data.Response === "False") {
          //no movie found
          console.log("MOVIE NOT FOUND");
        }

        if (res.data?.Search) {
          console.log(res.data.Search);
        }
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
    </div>
  );
}

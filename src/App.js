import React from "react";
import axios from "axios";

import { Button, Container, TextField } from "@material-ui/core";

console.log(process.env.REACT_APP_API_KEY);
console.log(process.env.NODE_ENV);
export default function App() {
  const API_KEY =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_KEY
      : process.env.REACT_APP_API_KEY;
  const URL = "https://www.omdbapi.com";
  const PARAMS = `?apikey=${API_KEY}&type=movie&s=`;

  const searchClick = (e) => {
    e.preventDefault();
    const search = e.target.title.value;
    axios.get(`${URL}${PARAMS}${search}`).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <Container>
        <form
          noValidate
          autoComplete="off"
          id="searchForm"
          onSubmit={searchClick}
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

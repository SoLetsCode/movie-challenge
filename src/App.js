import React from "react";
import { Button, Container, TextField } from "@material-ui/core";

export default function App() {
  const searchClick = (e) => {
    e.preventDefault();
    console.log(e.target.title.value);
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

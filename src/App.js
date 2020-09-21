import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./layouts/header";
import Home from "./pages/Home";

const useStyles = makeStyles((theme) => ({
  mainContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <Header />
      <main className={classes.mainContent}>
        <Route exact path="/" component={Home} />
      </main>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./layouts/Header";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
    </Router>
  );
}

export default App;

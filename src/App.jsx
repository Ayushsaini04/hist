import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import HistogramComponent from './HistogramComponent';
import Butt from './Butt';

function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        {<Butt />}
        </Route>

        <Route path="/histogram">
        {<HistogramComponent />}
        </Route>

        </ Switch>
        </ Router>
        
  );
}

export default App;

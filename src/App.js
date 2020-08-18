import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch, NavLink } from "react-router-dom";
import Home from "./Home";
import CompanyPage from "./CompanyPage";

class App extends Component{
  render(){
    return (
      <div>
        <Switch>
          {/* <Route exact path="/" render={(routeProps) => <Home {...routeProps} />} /> */}
          <Route exact path="/" render={() => <CompanyPage />} />
        </Switch>
      </div>
    );
  }
}

export default App;

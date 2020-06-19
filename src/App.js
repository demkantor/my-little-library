import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';


class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Sidebar />
          <div className="main-wrapper">
            <Switch>
              <Route exact path="/" component={Home}/>

              {/* 404 page */}
              <Route render={() => 
                <div className="fourOfour">
                  <h1>Lost? Me too...</h1>
                </div>
              }/>
            </Switch>
          </div>
        </Router>
      </>
    )
  }
};

export default App;

import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';

import Profile from './components/Profile/Profile';

class App extends Component {

  state = {
    expandSide: false
  }

  handleExpand = () => {
    this.setState({expandSide: !this.state.expandSide})
  }

  render() {
    const { expandSide } = this.state;

    return (
      <>
        <Router>
          <div className={expandSide ? "main-wrapper expanded" : "main-wrapper"}>
            <Navbar handleExpand={this.handleExpand}/>
            <Sidebar />
            <Switch>
              <Route exact path="/" component={Home}c/>
              <Route exact path="/profile" component={Profile} />

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

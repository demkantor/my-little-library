import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import RouteMap from './components/RouteMap/RouteMap';
import Home from './components/Home/Home';

import Profile from './components/Profile/Profile';
import Books from './components/Books/Books';
import Login from './components/Login/Login';


class App extends Component {

  state = {
    expandSide: false,
    loggedIn: false
  }

  handleExpand = () => {
    this.setState({expandSide: !this.state.expandSide})
  }

  render() {
    const { expandSide, loggedIn } = this.state;

    return (
      <>
        <Router>
          {loggedIn
          ?
          <div className={expandSide ? "main-wrapper expanded" : "main-wrapper"}>
            <Navbar handleExpand={this.handleExpand}/>
            <Sidebar />
            <RouteMap />
            <div className={expandSide ? "section-wrapper side-expanded" : "section-wrapper"}>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/books" component={Books} />

                {/* 404 page */}
                <Route render={() => 
                  <div className="fourOfour">
                    <h1>Lost? Me too...</h1>
                  </div>
                }/>
              </Switch>
            </div>
          </div>
          :
          <Login />
          }
        </Router>
      </>
    )
  }
};

export default App;

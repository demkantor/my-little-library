import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import RouteMap from './components/RouteMap/RouteMap';
import Home from './components/Home/Home';

import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Profile from './components/Profile/Profile';
import Books from './components/Books/Books';
import NewBook from './components/Books/NewBook';
import EditBook from './components/Books/EditBook';


class App extends Component {

  state = {
    expandSide: false,
    register: false
  };

  // handles viewport dependending on sidebar open
  handleExpand = () => {
    this.setState({ expandSide: !this.state.expandSide });
  };

  // handles switch from login to register mode
  handleRegister = () => {
    this.setState({ register: !this.state.register });
  };

  render() {
    const { expandSide, register } = this.state;
    const { loggedIn } = this.props;
    // const { location } = this.props

    return (
      <>
        <Router>
          {loggedIn === true
          ?
          <div className={expandSide ? "main-wrapper expanded" : "main-wrapper"}>
            <Navbar handleExpand={this.handleExpand}/>
            <Sidebar />
            <RouteMap />
            <div className={expandSide ? "section-wrapper side-expanded" : "section-wrapper"}>
              
            {/* <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={{ enter: 300, exit: 300 }}
                classNames={'fade'}> */}

                  <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/books" component={Books} />
                    <Route exact path="/books/new" component={NewBook} />
                    <Route exact path="/books/view/:title" component={EditBook} />

                    {/* 404 page */}
                    <Route render={() => 
                      <div className="fourOfour">
                        <h1>Lost? Me too...</h1>
                      </div>
                    }/>
                  </Switch>

                {/* </CSSTransition>
              </TransitionGroup> */}
            </div>
          </div>
          :
          <>
            {register === false 
              ?
              <Login 
                handleRegister={this.handleRegister}
                />
              :
              <Register 
                handleRegister={this.handleRegister}
                />
              }
            </>
          }
        </Router>
      </>
    )
  }
};


const putReduxStateOnProps = (reduxState) => ({
  loggedIn: reduxState.user.currentUser.authenticated
});


export default connect(putReduxStateOnProps)(App);

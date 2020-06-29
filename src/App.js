import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import RouteMap from './components/RouteMap/RouteMap';
import Home from './components/Home/Home';

import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Books from './components/Books/Books';
import NewBook from './components/Books/NewBook';
import EditBook from './components/Books/EditBook';


class App extends Component {

  state = {
    expandSide: false
  };

  // handles viewport dependending on sidebar open
  handleExpand = () => {
    this.setState({expandSide: !this.state.expandSide})
  };

  render() {
    const { expandSide } = this.state;
    const { loggedIn } = this.props;

    return (
      <>
        <Router>
          {loggedIn === false
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
                <Route exact path="/books/new" component={NewBook} />
                <Route exact path="/books/view/:title" component={EditBook} />

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


const putReduxStateOnProps = (reduxState) => ({
  loggedIn: reduxState.user.currentUser.authenticated
});


export default connect(putReduxStateOnProps)(App);

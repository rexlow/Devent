import React, { Component } from 'react';

import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import {
  View,
  Text,
  StatusBar
} from 'react-native';
import { Spinner } from './components/common';

import Router from './Router';

import Login from './components/auth/Login';
import Main from './components/Main';

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyA_jrPdLZQ3R3y6Oqu9ouYZh9NoHjSoC3o",
      authDomain: "devent-7da1c.firebaseapp.com",
      databaseURL: "https://devent-7da1c.firebaseio.com",
      storageBucket: "devent-7da1c.appspot.com",
      messagingSenderId: "870675382955"
    });

    // monitor user auth activity
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <Main />;
      case false:
        return <Login />;
      default:
        return <Spinner />
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" />
        <Router />
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)'
  }
}

export default App;

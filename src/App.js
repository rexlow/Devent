'use strict';
import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';

import SplashScreen from './containers/SplashScreen';
import LoadingScreen from './containers/LoadingScreen';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import Home from './containers/Home';

const routes = {
  SplashScreen,
  LoadingScreen,
  Login,
  Register,
  Home
};

class App extends Component {

  renderScene(route, navigator) {
    let Component = routes[route.name];

    return(
      <Component navigator={navigator} {...route.passProps}/>
    )
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'Register'}}
        renderScene={this.renderScene}
      />
    );
  }
}

export default App;

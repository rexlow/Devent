'use strict';
import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';

import SplashScreen from './containers/SplashScreen';
import LoadingScreen from './containers/LoadingScreen';
import LoginScreen from './containers/auth/LoginScreen';
import Home from './containers/Home';

const routes = {
  SplashScreen,
  LoadingScreen,
  LoginScreen,
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
        initialRoute={{name: 'LoginScreen'}}
        renderScene={this.renderScene}
      />
    );
  }
}

export default App;

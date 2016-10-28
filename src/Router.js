import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import SplashScreen from './containers/SplashScreen';
import LoadingScreen from './containers/LoadingScreen';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import Home from './containers/Home';

class RouterComponent extends Component {
  render() {
    return(
      <View style={{ flex: 1 }}>
        <Router>
          <Scene key="auth" hideNavBar initial>
            <Scene key="login" component={Login} initial />
            <Scene key="register" component={Register} />
          </Scene>
          <Scene key="main" >
            <Scene key="home" component={Home} />
          </Scene>
        </Router>
      </View>
    )
  }
}

export default RouterComponent;

'use strict'
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './actions';

import SplashScreen from './containers/SplashScreen';
import LoadingScreen from './containers/LoadingScreen';

import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import ResetPassword from './containers/auth/ResetPassword';

import Home from './containers/tabContainers/Home';
import Search from './containers/tabContainers/Search';
import Profile from './containers/tabContainers/Profile';

const TabIcon = ({ selected, title}) => {
  return(
    <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
  );
};

class RouterComponent extends Component {

  componentWillMount() {
    this.props.listenToUser();
  }

  render() {
    return(
      <View style={{ flex: 1 }}>
        <Router>
          <Scene key="auth" initial>
            <Scene key="splash" component={SplashScreen} initial hideNavBar/>
            <Scene key="login" component={Login} hideNavBar/>
            <Scene key="register" component={Register} hideNavBar={false} />
            <Scene key="resetPassword" component={ResetPassword} hideNavBar={false} />
          </Scene>
          <Scene key="main">
            <Scene key="tabbar" tabs >
              <Scene key="homeTab" component={Home} title="Home" initial icon={TabIcon} hideNavBar/>
              <Scene key="searchTab" component={Search} title="Search" icon={TabIcon} hideNavBar/>
              <Scene key="profileTab" component={Profile} title="Profile" icon={TabIcon} hideNavBar/>
            </Scene>
          </Scene>
        </Router>
      </View>
    )
  }
}

export default connect(null, actions)(RouterComponent);

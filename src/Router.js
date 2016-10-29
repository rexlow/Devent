import React, { Component } from 'react';
import { View } from 'react-native';

import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './actions';

import SplashScreen from './containers/SplashScreen';
import LoadingScreen from './containers/LoadingScreen';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import Home from './containers/Home';

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
          </Scene>
          <Scene key="main" hideNavBar>
            <Scene key="home" component={Home} />
          </Scene>
        </Router>
      </View>
    )
  }
}

export default connect(null, actions)(RouterComponent);

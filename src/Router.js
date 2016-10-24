import React, { Component } from 'react';

import { Navigator } from 'react-native';

import { connect } from 'react-redux';
import { isLoggedIn } from './actions';
import { Scene, Router, Actions, Animations, Schema } from 'react-native-router-flux';

import firebase from 'firebase';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SplashScreen from './components/SplashScreen';
import Main from './components/Main';

class RouterComponent extends Component {

  state = { loggedIn: false }

  componentWillMount() {
    this.props.isLoggedIn();
  }

  render() {
    return(
      <Router
        sceneStyle={{ paddingTop: 60 }}
        navigationBarStyle={{backgroundColor: '#448AFF',borderBottomColor:"#448AFF"}}
        titleStyle={{color : "#FFF", fontWeight: '600'}}
        barButtonIconStyle={{ tintColor:'#FFF' }}>

        <Scene key="root">
          <Scene key="splashScreen" component={SplashScreen} />
          
          <Scene key="mainContainer">
            <Scene key="main" component={Main} title="Main Page" direction="vertical" />
          </Scene>

          <Scene key="authContainer" >
            <Scene key="login" component={Login} title="Login Page" />
            <Scene key="register" component={Register} title="Register Page" />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default connect(null, { isLoggedIn })(RouterComponent);

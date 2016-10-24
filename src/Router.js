import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import Main from './components/Main';

const RouterComponent = () => {
  return(
    <Router sceneStyle={{ }} hideNavBar={true}>
      <Scene key="auth" initial>
        <Scene key="login" component={Login} title="Login Page" />
        <Scene key="register" component={Register} title="Register Page" />
      </Scene>

      <Scene key="mainContainer">
        <Scene key="main" component={Main} title="Main Page" />
      </Scene>
    </Router>
  )
}

export default RouterComponent;

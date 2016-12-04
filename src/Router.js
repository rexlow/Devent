'use strict'
import React, { Component } from 'react';
import { View, Text, StatusBar, Alert } from 'react-native';

import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './actions';

import SplashScreen from './containers/SplashScreen';

import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import ResetPassword from './containers/auth/ResetPassword';

import Home from './containers/tabContainers/Home';
import Trending from './containers/tabContainers/Trending';
import Profile from './containers/tabContainers/Profile';
import Search from './containers/tabContainers/Search';
import EventItemDetail from './containers/tabContainers/EventItemDetail';
import AddInterest from './containers/tabContainers/Profile/AddInterest';
import AdminPanel from './containers/tabContainers/Profile/AdminPanel';
import EditProfile from './containers/tabContainers/Profile/EditProfile';
import ManageEvent from './containers/tabContainers/Profile/ManageEvent';
import ManageCreatedEvent from './containers/tabContainers/Profile/ManageCreatedEvent';
import EditCreatedEvent from './containers/tabContainers/Profile/EditCreatedEvent';
import AddEvent from './containers/tabContainers/Profile/AddEvent';
import AdminEventItem from './containers/tabContainers/Profile/AdminEventItem';

const TabIcon = ({ selected, title}) => {
  return(
    <Text style={{
        color: '#5B5A5A',
        fontWeight: selected ? '600' : '200'
    }}>{title}</Text>
  );
};

class RouterComponent extends Component {

  componentWillMount() {
    this.props.listenToUser();
  }



  render() {
    const { sceneStyle, navigationBarStyle, titleStyle } = styles;
    return(
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="rgba(0,0,0,1)"
          translucent
          barStyle="light-content"
        />
        <Router
          sceneStyle={sceneStyle}
          navigationBarStyle={navigationBarStyle}
          titleStyle={titleStyle}>
          <Scene key="auth" initial hideNavBar>
            <Scene key="splash" component={SplashScreen} initial />
            <Scene key="login" component={Login} />
            <Scene key="register" component={Register} />
            <Scene key="resetPassword" component={ResetPassword}  />
          </Scene>
          <Scene key="main">
            <Scene key="tabbar" tabs tabBarStyle={styles.tabBarStyle} >
              <Scene key="homeTab" title="Home" icon={TabIcon} initial>
                <Scene key="home" component={Home} title="Home Screen" initial />
              </Scene>
              <Scene key="searchTab" component={Trending} title="Trending" icon={TabIcon}/>
              <Scene key="profileTab" component={Profile} title="Profile" icon={TabIcon} />
            </Scene>
            <Scene
              key="search"
              component={Search}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
            <Scene
              key="eventItemDetail"
              component={EventItemDetail}
              leftButtonIconStyle={{tintColor: '#FFF'}}/>
            <Scene
              key="adminPanel"
              component={AdminPanel}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
            <Scene
              key="addInterest"
              component={AddInterest}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
            <Scene
              key="editProfile"
              component={EditProfile}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
            <Scene
              key="manageEvent"
              component={ManageEvent}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
            <Scene
              key="manageCreatedEvent"
              component={ManageCreatedEvent}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
            <Scene
              key="editCreatedEvent"
              component={EditCreatedEvent}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
            <Scene
              key="addEvent"
              component={AddEvent}
              leftButtonIconStyle={{tintColor: '#FFF'}} />
              <Scene
                key="adminEventItem"
                component={AdminEventItem}
                leftButtonIconStyle={{tintColor: '#FFF'}} />
          </Scene>
        </Router>
      </View>
    )
  }
}

const styles = {
  tabBarStyle: {
    position: 'absolute',
    top: 60,
  },
  sceneStyle: {
    backgroundColor: '#F5F6F7'
  },
  navigationBarStyle: {
    backgroundColor: '#2D292A',
    borderBottomWidth: 0,
  },
  titleStyle: {
    fontFamily: 'HelveticaNeue-Medium',
    color: '#FFF',
    letterSpacing: 4,
    fontWeight: '500'
  }
}

export default connect(null, actions)(RouterComponent);

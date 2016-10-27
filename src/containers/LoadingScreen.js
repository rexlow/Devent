import React, { Component } from 'react';
import {
  View,
  Text,
  LayoutAnimation
} from 'react-native';

import firebase from 'firebase';
import SplashScreen from './SplashScreen';

class LoadingScreen extends Component {

  state = { loggedIn: null, time: 0 }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyA_jrPdLZQ3R3y6Oqu9ouYZh9NoHjSoC3o",
      authDomain: "devent-7da1c.firebaseapp.com",
      databaseURL: "https://devent-7da1c.firebaseio.com",
      storageBucket: "devent-7da1c.appspot.com",
      messagingSenderId: "870675382955"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch(this.state.loggedIn){
      case true:
        this.props.navigator.push({
          name: 'Home'
        });
        return ;
      case false:
        this.props.navigator.push({
          name: 'LoginScreen'
        });
        return ;
      default:
        return <SplashScreen />
    }
  }

  render() {
    return(
      <View style={{ flex: 1 }}>
        {this.renderContent()}
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 38,
    letterSpacing: 9,
    fontFamily: 'HelveticaNeue-Light',
    paddingBottom: 10
  },
  desc: {
    fontSize: 16,
    letterSpacing: 0,
    fontFamily: 'HelveticaNeue-Thin',
    paddingBottom: 10
  }
}

export default LoadingScreen;

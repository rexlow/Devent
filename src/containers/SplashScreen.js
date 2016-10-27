import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import {
  Spinner
} from './../components/common';

class SplashScreen extends Component {

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Devent</Text>
        <Text style={styles.desc}>The only event browser for developer</Text>
        <Spinner size="small"/>
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

export default SplashScreen;

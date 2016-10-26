import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Spinner } from './common';

class SplashScreen extends Component {
  render(){
    return(
      <View style={styles.mainContainer}>
        <Text style={styles.titleStyle}>Devent</Text>
        <Spinner color="white" />
      </View>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#448AFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFF'
  }
}

export default SplashScreen;

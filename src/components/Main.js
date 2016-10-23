import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar
} from 'react-native';


class Main extends Component {
  render(){
    console.log('Main');
    return(
      <View style={styles.mainContainer}>
        <Text>Main</Text>
      </View>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#448AFF'
  }
}

export default Main;

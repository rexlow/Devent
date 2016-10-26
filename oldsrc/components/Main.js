import React, { Component } from 'react';
import firebase from 'firebase';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';


class Main extends Component {
  render(){
    console.log('Main');
    return(
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => firebase.auth().signOut()}>
          <Text>Main</Text>
        </TouchableOpacity>

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
  }
}

export default Main;

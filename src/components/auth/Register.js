import React, { Component } from 'react';

import {
  View,
  Text
} from 'react-native';

import TextField from 'react-native-md-textinput';

class Register extends Component {
  render(){
    return(
      <View style={styles.mainContainer}>
        <Text>Register</Text>
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

export default Register;

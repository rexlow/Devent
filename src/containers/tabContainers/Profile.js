import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Profile extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>Profile</Text>
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
}

export default Profile;

import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import { View, Text, TouchableOpacity } from 'react-native';

class Profile extends Component {

  signOut() {
    this.props.logoutUser();
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={this.signOut.bind(this)}>
          <Text>Sign out</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 110,
  },
  title: {
    fontSize: 38,
    letterSpacing: 9,
    fontFamily: 'HelveticaNeue-Light',
    paddingBottom: 10
  },
}

export default connect(null, actions)(Profile);

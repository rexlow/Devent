'use strict';
import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';
import { Input, Spinner, Button } from './../../components/common';

const dismissKeyboard = require('dismissKeyboard')
const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;


class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.processAuth(nextProps);
  }

  resetPasswordHelper() {
    Alert.alert(
      'Confirm',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.props.resetPassword(this.state.email)},
        {text: 'Cancel', onPress: () => console.log('Reset password button cancel')}
      ]
    )

  }

  processAuth(props) {
    if(props.auth.message){
      Alert.alert('Alert', props.auth.message)
    }
  }

  render() {

    const { centerEverything, container, title, desc } = styles;

    return(
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <View style={[centerEverything, container]}>
          <View style={[ centerEverything ]}>
            <Text style={title}>Reset your password</Text>
            <Text style={[title, desc]}>We will send a confirmation letter to your email</Text>

          <View style={{ padding: 60 }}>
            <Input
              placeholder="Email"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email} />
          </View>


          <Button buttonText="Send" onPress={this.resetPasswordHelper.bind(this)} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
  },
  upperContainer: {
    flex: 6,
    paddingTop: 30
  },
  middleContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 3,
  },
  title: {
    color: '#5B5A5A',
    fontSize: 22,
    letterSpacing: 0,
    fontWeight: '400',
  },
  desc: {
    fontSize: 14,
    fontWeight: '200',
    paddingTop: 20
  },
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(ResetPassword);

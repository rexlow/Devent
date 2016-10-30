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

  resetPasswordHelper() {
    this.props.resetPassword(this.state.email)
  }

  render() {

    const { centerEverything, container, upperContainer, middleContainer, bottomContainer,
       title, desc, someMargin } = styles;

    return(
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <View style={[centerEverything, container]}>
          <View style={[upperContainer, centerEverything ]}>
            <Text style={title}>Reset your password</Text>
            <Text style={[title, desc]}>We will send a confirmation letter to your email</Text>
          </View>
          <View style={[middleContainer, ]}>
            <Input
              placeholder="Email"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email} />
          </View>
          <View style={[bottomContainer]}>
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
    borderColor: 'black',
    borderWidth: 1
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
  },
  someMargin: {
    width: deviceWidth*0.8
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(ResetPassword);

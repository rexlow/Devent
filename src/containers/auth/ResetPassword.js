'use strict';
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import ButtonComponent from 'react-native-button-component';
import { Input, Spinner, Button } from './../../components/common';

const dismissKeyboard = require('dismissKeyboard')
const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;


class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      buttonState: 'reset'
    }

    this.buttonStates = {
      reset: {
        text: 'RESET PASSWORD',
        onPress: () => {
          this.resetPasswordHelper();
        },
      },
      loading: {
        spinner: true,
        text: 'SENDING EMAIL...'
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.processAuth(nextProps);
  }

  resetPasswordHelper() {
    Alert.alert(
      'Confirm',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => {
          this.setState({ buttonState: 'loading' });
          this.props.resetPassword(this.state.email);
        }},
        {text: 'Cancel', onPress: () => console.log('Reset password button cancel')}
      ]
    )

  }

  processAuth(props) {
    if(props.auth.message){
      this.setState({ buttonState: 'reset' });
      Alert.alert('Alert', props.auth.message);
    }
  }

  render() {

    const { centerEverything, container, title, desc, buttonStyle } = styles;

    return(
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <View style={[centerEverything, container]}>
          <View style={[ centerEverything ]}>
            <Text style={title}>Reset your password</Text>
            <Text style={[title, desc]}>We will send a confirmation letter to your email</Text>

            <View style={[centerEverything, {padding: 60}]}>
              <Input
                placeholder="Email"
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email} />
            </View>

            <ButtonComponent
              style={buttonStyle}
              type='primary'
              shape='reactangle'
              buttonState={this.state.buttonState}
              states={this.buttonStates}
            />

            <ButtonComponent
              style={buttonStyle}
              type='primary'
              shape='rectangle'
              text="GO BACK"
              onPress={() => Actions.pop()}
            />

          {/* <Button buttonText="Send" onPress={this.resetPasswordHelper.bind(this)} /> */}
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
  buttonStyle: {
    backgroundColor: '#129793',
    height: 40,
    width: deviceWidth*0.7,
    borderRadius: 20,
    margin: 3
  },
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(ResetPassword);

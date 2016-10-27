'use strict';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Input,
  Spinner,
  Button
} from './../../components/common';

class Login extends Component {

  render() {
    const {
      centerEverything, container, upperContainer, title, middleContainer, welcomeTitle,
      forgotPasswordContainer, forgotPassword, inputContainer, bottomContainer, bottomText, redText
    } = styles;

    return(
      <View style={[container]}>
        <View style={[upperContainer, centerEverything]}>
          <Text style={title}>DEVENT</Text>
        </View>
        <View style={[middleContainer, centerEverything]}>
          <Text style={welcomeTitle}>WELCOME</Text>
          <View style={[centerEverything], {paddingBottom: 30}}>
            <Input label="email" placeholder="Email" />
            <Input label="password" placeholder="Password" secureTextEntry />
            <View style={forgotPasswordContainer}>
              <TouchableOpacity onPress={() => console.log('Press')}>
                <Text style={forgotPassword}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button buttonText="SIGN IN" />
        </View>
        <View style={[bottomContainer, centerEverything]}>
          <Text style={bottomText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => console.log('goto sign up')}>
            <Text style={[bottomText], redText}>Create new account</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = {
  helvMedium: {
    fontFamily: 'HelveticaNeue-Medium',
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
  },
  upperContainer: {
    flex: 2,
  },
  middleContainer: {
    flex: 7,
  },
  bottomContainer: {
    flex: 1,
  },
  title: {
    color: '#5B5A5A',
    fontSize: 36,
    letterSpacing: 9,
    fontWeight: '400',
    marginTop: 200
  },
  welcomeTitle: {
    color: '#5B5A5A',
    fontSize: 23,
    letterSpacing: 4,
    fontWeight: '400',
    paddingBottom: 30
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    paddingTop: 5
  },
  forgotPassword: {
    color: '#5B5A5A',
    fontFamily: 'HelveticaNeue-Medium',
    fontWeight: '400'
  },
  bottomText: {
    color: '#5B5A5A',
    fontSize: 14,
    fontWeight: '300',
  },
  redText: {
    color: '#FF7260'
  }
}

export default Login;

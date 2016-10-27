'use strict';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Input,
  Button
} from './../../components/common';

class Register extends Component {

  render() {
    const {
      centerEverything, container, upperContainer, title, middleContainer,
      inputContainer, bottomContainer, terms, termsText
    } = styles;

    return(
      <View style={[container]}>
        <View style={[upperContainer, centerEverything]}>
          <View style={[centerEverything, { paddingTop: 150 }]}>
            <Text style={title}>CREATE NEW</Text>
            <Text style={title}>ACCOUNT</Text>
          </View>
        </View>
        <View style={[middleContainer, centerEverything]}>
          <View style={[centerEverything]}>
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
            <Input placeholder="Email Address" />
            <Input placeholder="Password" secureTextEntry />
            <View style={[terms, centerEverything]}>
              <Text style={termsText}>By tapping "Sign Up" you agree</Text>
              <Text style={termsText}>to the terms & conditions</Text>
            </View>
          </View>
        </View>
        <View style={[bottomContainer, centerEverything]}>
          <Button buttonText="CREATE NEW ACCOUNT" />
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
    flex: 5,
  },
  bottomContainer: {
    flex: 3,
  },
  title: {
    color: '#5B5A5A',
    fontSize: 20,
    letterSpacing: 5,
    fontWeight: '400',
  },
  terms: {
    paddingTop: 10
  },
  termsText: {
    color: '#5B5A5A',
    fontFamily: 'HelveticaNeue-Medium',
    fontWeight: '400'
  }
}

export default Register;

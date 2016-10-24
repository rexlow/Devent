import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Input } from './../common';

import { Actions } from 'react-native-router-flux';


export default class Login extends Component {
  state = { email: '', password: ''};
  render(){
    const { mainContainer, upperPart, middlePart, middleRegister, middleLogin, bottomPart, loginText, registerText } = styles;

    return(
      <View style={mainContainer}>
        <View style={upperPart}>
          <Input
            label="Email"
            iconName="email"
            placeholder="john@apple.com"
            onChangeText={email => this.setState({ email })}
            value={this.state.email} />
          <Input
            label="Password"
            iconName="vpn-key"
            placeholder="password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            secureTextEntry />
        </View>
        <View style={middlePart}>
          <TouchableOpacity style={middleRegister} onPress={() => Actions.register()}>
            <Text style={loginText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={middleLogin}>
            <Text style={loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#448AFF',
    justifyContent: 'center',
  },
  upperPart: {
    flex: 7,
    paddingTop: 20
  },
  middlePart: {
    flex: 3,
    flexDirection: 'row'
  },
  middleRegister: {
    flex: 1,
    backgroundColor: '#E040FB',
    justifyContent: 'center',
    alignItems: 'center'
  },
  middleLogin: {
    flex: 1,
    backgroundColor: '#FF4081',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomPart: {
    flex: 0.5,
    backgroundColor: '#FF4081',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 5
  },
  loginText: {
    fontSize: 30,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  registerText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFFFFF'
  }
}

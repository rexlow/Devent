import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';

class Login extends Component {

  render(){
    const { mainContainer, upperPart, middlePart, bottomPart, loginText, registerText } = styles;
    return(
      <View style={mainContainer}>
        <View style={upperPart}>
          <Kohana
            style={{ backgroundColor: 'transparent', height: 50 }}
            label={'Email'}
            iconClass={MaterialsIcon}
            iconName={'email'}
            iconColor={'#1976D2'}
            labelStyle={{ color: '#FFFFFF' }}
            inputStyle={{ color: '#FFFFFF' }}
          />
          <Kohana
            style={{ backgroundColor: 'transparent', height: 50 }}
            label={'Password'}
            iconClass={MaterialsIcon}
            iconName={'vpn-key'}
            iconColor={'#1976D2'}
            labelStyle={{ color: '#FFFFFF' }}
            inputStyle={{ color: '#FFFFFF' }}
          />
        </View>
        <View style={middlePart}>
          <Text style={loginText}>Login</Text>
        </View>
        <View style={bottomPart}>
          <Text style={registerText}>Haven't registered?</Text>
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
    flex: 6,
    paddingTop: 20
  },
  middlePart: {
    flex: 3,
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

export default Login;

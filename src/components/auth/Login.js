import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from './../../actions';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Input, Spinner } from './../common';
import { Actions } from 'react-native-router-flux';

class Login extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginPress() {
    const { email, password } = this.props;
    
    if ((email === '') && (password === '')){
      Alert.alert('Alert', 'Please enter your email and password');
    }else if (email === '') {
      Alert.alert('Alert', 'Email is badly formatted');
    }else if (password === '') {
      Alert.alert('Alert', 'Password is badly formatted');
    }

    this.props.loginUser({ email, password });
  }

  processAuth() {
    if(this.props.loading){
      return <Spinner />;
    };

    return (
      <Text style={styles.loginText}>Login</Text>
    );
  }

  render(){
    const { mainContainer, upperPart, middlePart, middleRegister, middleLogin, bottomPart, loginText, registerText } = styles;

    return(
      <View style={mainContainer}>
        <View style={upperPart}>
          <Input
            label="Email"
            iconName="email"
            placeholder="john@apple.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email} />
          <Input
            label="Password"
            iconName="vpn-key"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            secureTextEntry />
        </View>

        <View style={middlePart}>
          <TouchableOpacity style={middleRegister} onPress={() => Actions.register()}>
            <Text style={loginText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={middleLogin} onPress={this.onLoginPress.bind(this)}>
            {this.processAuth()}
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

const mapStateToProps = ({ auth }) => {
  const { email, password, loading, error } = auth;
  return { email, password, loading, error };
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(Login);

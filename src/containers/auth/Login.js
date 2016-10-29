'use strict';
import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';
import {
  Input,
  Spinner,
  Button
} from './../../components/common';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null
    };
  }

  componentWillMount() {
    LayoutAnimation.easeInEaseOut();
  }

  componentDidMount() {
    this.processAuth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.processAuth(nextProps);
  }

  loginUser() {
    const { email, password } = this.state;
    console.log(this.state)
    this.props.loginUser(email, password);
  }

  processAuth(props) {
    if(props.auth.user != null) {
      if(props.auth.user.uid) {
        Actions.main({ type: 'reset' });
      }
      if(props.auth.error) {
        this.setState({ error: this.props.error })
      }
    }
  }

  render() {
    const {
      centerEverything, container, upperContainer, title, middleContainer, welcomeTitle,
      forgotPasswordContainer, forgotPassword, inputContainer, bottomContainer, bottomText,
      redText, errorText
    } = styles;

    return(
      <View style={[container]}>
        <View style={[upperContainer, centerEverything]}>
          <Text style={title}>DEVENT</Text>
        </View>

        <View style={[middleContainer, centerEverything]}>
          <Text style={welcomeTitle}>WELCOME</Text>
          <View style={[centerEverything], {paddingBottom: 30}}>
            <Input
              label="email"
              placeholder="Email"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email} />
            <Input
              label="password"
              placeholder="Password"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              secureTextEntry />
            <View style={forgotPasswordContainer}>
              <TouchableOpacity onPress={() => console.log('forgot')}>
                <Text style={forgotPassword}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button buttonText="SIGN IN" onPress={this.loginUser.bind(this)}/>
          <Text style={[forgotPassword, errorText]}>{this.state.error}</Text>
        </View>

        <View style={[bottomContainer, centerEverything]}>
          <Text style={bottomText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => Actions.register()}>
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
  },
  errorText: {
    paddingTop: 10,
    backgroundColor: 'transparent'
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(Login);

import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Input, Spinner } from './../../../components/common';
import ButtonComponent from 'react-native-button-component';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class EditProfile extends Component {

  state = {
    firstName: '',
    lastName: '',
    password: ''
  }

  render() {
    const { centerEverything, skeleton, container, textContainer, contentContainer, buttonContainer,
      propWidth, titleContainer, descContainer, title, editTitle, desc, buttonStyle } = styles;
    return (
      <View style={[centerEverything, container]}>
        <View style={[centerEverything, textContainer]}>
          <View style={titleContainer}>
            <Text style={[title]}>Edit Your Profile</Text>
          </View>
          <View style={descContainer}>
            <Text style={[desc]}>Got something new?</Text>
          </View>
        </View>
        <View style={[contentContainer, propWidth]}>
          <Text style={[editTitle]}>First name and last name</Text>
          <Input
            propWidth={propWidth}
            placeholder="First Name"
            onChangeText={(firstName) => this.setState({ firstName })}
            value={this.state.firstName} />
          <Input
            propWidth={propWidth}
            placeholder="Last Name"
            onChangeText={(lastName) => this.setState({ lastName })}
            value={this.state.lastName} />
          <View style={{ paddingTop: 20 }}>
            <Text style={[editTitle]}>Change your password</Text>
            <Input
              propWidth={propWidth}
              label="password"
              placeholder="Password"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              secureTextEntry />
          </View>
        </View>
        <View style={[centerEverything, buttonContainer]}>
          <ButtonComponent
            style={buttonStyle}
            type='primary'
            shape='reactangle'
            text="SAVE"
            onPress={() => console.log('save update')}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  skeleton: {
    borderWidth: 1,
    borderColor: 'red'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F6F7',
    marginTop: 64
  },
  textContainer: {
    flex: 2,
    height: 100,
    marginTop: 20
  },
  propWidth: {
    width: deviceWidth*0.8
  },
  contentContainer: {
    flex: 6,
  },
  buttonContainer: {
    flex: 2
  },
  titleContainer: {
    width: deviceWidth*0.8,
  },
  descContainer: {
    width: deviceWidth*0.6,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    textAlign: 'center'
  },
  editTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'left',
    paddingBottom: 10
  },
  desc: {
    color: 'grey',
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'center'
  },
  buttonStyle: {
    height: 40,
    width: deviceWidth*0.7,
    borderRadius: 20,
    margin: 3
  },
}
export default EditProfile;

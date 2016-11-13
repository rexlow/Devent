'use strict';
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

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../../actions';
import firebase from 'firebase';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class ManageEvent extends Component {

  render() {
    const { centerEverything, skeleton, container, textContainer, contentContainer, buttonContainer,
      propWidth, titleContainer, descContainer, title, editTitle, desc, buttonStyle } = styles;
    return (
      <View style={[centerEverything, container]}>
        <View style={[centerEverything, textContainer]}>
          <View style={titleContainer}>
            <Text style={[title]}>Event Place</Text>
          </View>
          <View style={descContainer}>
            <Text style={[desc]}>One place to manage all your events.</Text>
          </View>
        </View>
        <View style={[contentContainer]}>
          <View style={[buttonContainer]}>
            <ButtonComponent
              style={buttonStyle}
              type='primary'
              shape='rectangle'
              text="ADD EVENT"
              onPress={() => Actions.addEvent()}
            />
          </View>
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
    marginTop: 44
  },
  textContainer: {
    flex: 2,
    marginTop: 20
  },
  propWidth: {
    width: deviceWidth*0.8
  },
  contentContainer: {
    flex: 8,
    width: deviceWidth
  },
  buttonContainer: {
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 20
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

export default connect(null, actions)(ManageEvent);

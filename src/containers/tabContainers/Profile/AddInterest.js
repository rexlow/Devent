import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import InterestItem from './InterestItem';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const computer = (<MaterialIcon name="computer" size={33} color="#aeaeae" />)
const add = (<MaterialIcon name="add" size={33} color="#aeaeae" />)

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class AddInterest extends Component {

  render() {
    const { centerEverything, skeleton, container, textContainer, contentContainer, titleContainer, descContainer, title, desc } = styles;
    return (
      <View style={[container]}>
        <View style={[centerEverything, textContainer]}>
          <View style={titleContainer}>
            <Text style={[title]}>What kind of events are you interest in?</Text>
          </View>
          <View style={descContainer}>
            <Text style={[desc]}>You'll see more events from the categories you choose.</Text>
          </View>
        </View>

        <View style={[contentContainer]}>
          <InterestItem icon={computer} text="Science"/>
          <InterestItem icon={add} text="Add"/>
          <InterestItem icon={add} text="Add"/>
          <InterestItem icon={add} text="Add"/>
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
    flex: 2
  },
  contentContainer: {
    flex: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10
  },
  titleContainer: {
    width: deviceWidth*0.8,
  },
  descContainer: {
    width: deviceWidth*0.6,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    textAlign: 'center'
  },
  desc: {
    color: 'grey',
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'center'
  }
}
export default AddInterest;

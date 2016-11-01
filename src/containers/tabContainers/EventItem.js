import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class EventItem extends Component {
  render() {
    const { address, artwork, cost, date, logo,
            title, organizer, note, time } = this.props.event;
    const { container, imageStyle, contentContainer } = styles;
    return(
      <TouchableWithoutFeedback onPress={() => Actions.eventItemDetail(this.props.event)}>
        <View style={container}>
          <Image
            style={imageStyle}
            source={{uri: logo}}
          />
          <View style={contentContainer}>
            <Text>{title}</Text>
            <Text>{organizer}</Text>
            <Text>{date}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    width: deviceWidth,
    height: 170,
    flexDirection: 'row',
    padding: 5
  },
  imageStyle: {
    flex: 3,
    width: 100,
    height: 100
  },
  contentContainer: {
    flex: 7,
    padding: 5
  }
}

export default EventItem;

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

import { Actions } from 'react-native-router-flux';

class EventItem extends Component {
  render() {
    const { address, artwork, cost, date, logo,
            title, organizer, note, time } = this.props.event;
    const { container, imageStyle } = styles;
    return(
      <TouchableWithoutFeedback onPress={() => Actions.eventItemDetail(this.props.event)}>
        <View>
          <Image
            style={imageStyle}
            source={{uri: logo}}
          />
          <Text>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: 200,
    height: 200
  }
}

export default EventItem;

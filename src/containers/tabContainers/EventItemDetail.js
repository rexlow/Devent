import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import ButtonComponent from 'react-native-button-component';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class EventItemDetail extends Component {
  render() {
    const { artwork, cost, date, logo,
            title, organizer, note, time } = this.props;
    const { container, imageStyle, buttonStyle } = styles;
    return(
      <View style={container}>
        <Image
          style={imageStyle}
          source={{uri: artwork}}
        />
        <Text>{note}</Text>
        <ButtonComponent
          style={buttonStyle}
          type='primary'
          shape='reactangle'
          text="GO BACK"
          onPress={() => Actions.pop()}
        />
      </View>
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
    width: deviceWidth,
    height: 150
  },
  buttonStyle: {
    backgroundColor: '#129793',
    height: 40,
    width: deviceWidth*0.7,
    borderRadius: 20,
    margin: 3
  },
}

export default EventItemDetail;

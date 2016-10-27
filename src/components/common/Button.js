import React from 'react';
import { Text, TouchableOpacity  } from 'react-native';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const Button = ({ buttonText }) => {
  const { buttonStyle, buttonTextStyle} = styles;
  return(
    <TouchableOpacity
      onPress={() => console.log('Button press')}
      style={styles.buttonStyle}>
      <Text style={buttonTextStyle}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

const styles = {
  buttonStyle: {
    backgroundColor: '#129793',
    height: 40,
    width: deviceWidth*0.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#129793',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 5
  },
  buttonTextStyle: {
    color: '#FFFFFF'
  }
}

export { Button };

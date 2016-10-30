import React from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

const SearchBar = ({ placeholder, secureTextEntry, onChangeText, value }) => {

  const { inputStyle } = styles;

  return(
    <TextInput
      style={inputStyle}
      autoCapitalize={'none'}
      autoCorrect={false}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
    />
  )
}

const styles = {
  inputStyle: {
    height: 30,
    width: deviceWidth*0.9,
    backgroundColor: '#FFF',
    opacity: 0.49,
    borderColor: '#CFD0D1',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: 'HelveticaNeue-Light',
    fontWeight: '600',
    paddingLeft: 20,
  }
}

export { SearchBar };

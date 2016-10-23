import React from 'react';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';

const Input = ({ label, iconName, placeholder, secureTextEntry, onChangeText, value}) => {
  return(
    <Kohana
      style={{ backgroundColor: 'transparent' }}
      label={label}
      iconClass={MaterialsIcon}
      iconName={iconName}
      iconColor={'#1976D2'}
      labelStyle={{ color: '#FFFFFF' }}
      inputStyle={{ color: '#FFFFFF' }}
      autoCapitalize={'none'}
      autoCorrect={false}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
    />
);
}

export { Input };

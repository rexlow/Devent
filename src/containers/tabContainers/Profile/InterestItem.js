import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native';


const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class InterestItem extends Component {

  state = {
    selected: false
  }

  render() {
    const { skeleton, centerEverything, container, textStyle } = styles;
    return(
      <TouchableWithoutFeedback onPress={() => this.setState({ selected: !this.state.selected })}>
        <View style={[centerEverything, container, { backgroundColor: this.state.selected ? '#635eb4' : '#e7e7e7'}]}>
          {this.props.icon}
          <Text style={textStyle}>{this.props.item[0]}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  skeleton: {
    borderWidth: 1,
    borderColor: 'red'
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    height: 150,
    width: deviceWidth*0.28,
    borderRadius: 5,
    margin: 5
  },
  textStyle: {
    color: '#aeaeae',
    fontSize: 14,
    fontWeight: '500',
    paddingTop: 8
  }
}

export default InterestItem;

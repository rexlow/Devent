import _ from 'lodash';
import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { SearchBar } from './../../components/common';

const dismissKeyboard = require('dismissKeyboard')

class Search extends Component {

  componentWillMount() {
    this.props.pullTrendingData();
  }

  render() {

    const { centerEverything, container, title, makeItTop } = styles;

    return(
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <View style={[centerEverything, container]}>
          <View style={[makeItTop]}>
            <SearchBar placeholder="🔍 Search Event" />
          </View>

          <Text>List of event</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    marginTop: 50
  },
  title: {
    fontSize: 38,
    letterSpacing: 9,
    fontFamily: 'HelveticaNeue-Light',
    paddingBottom: 10
  },
  makeItTop: {
    position: 'absolute',
    top: 65,
    left: 20
  }
}

const mapStateToProps = (state) => {
  return {
    trendingData: state.api
  }
}

export default connect(mapStateToProps, actions)(Search);

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from './../../components/common';

class Search extends Component {
  render() {

    const { centerEverything, container, title, makeItTop } = styles;

    return(
      <View style={[centerEverything, container]}>
        <View style={[makeItTop]}>
          <SearchBar placeholder="🔍 Search Event" />
        </View>

        <Text>List of events</Text>
      </View>
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

export default Search;

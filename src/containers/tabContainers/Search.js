import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ListView
} from 'react-native';

import TrendingItem from './TrendingItem';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import { SearchBar } from './../../components/common';

const dismissKeyboard = require('dismissKeyboard')

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Search extends Component {

  componentWillMount() {
    this.props.pullTrendingData();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ items }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(items);
  }

  //return arrays of event from events
  renderRow(item) {
    return <TrendingItem item={item} />;
  }

  render() {
    // console.log(this.props.trendingData.trendingData);
    const { skeleton, centerEverything, container, contentContainer, listViewContainer, makeItTop } = styles;

    return(
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <View style={[container]}>
          <View style={[makeItTop]}>
            <SearchBar placeholder="🔍 Search Event" />
          </View>
          <View style={[contentContainer]}>
            <ListView
              contentContainerStyle={listViewContainer}
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow}
            />
          </View>
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
    flex: 1,
    backgroundColor: '#F5F6F7',
    marginTop: 50
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listViewContainer: {
    paddingTop: 20
  },
  makeItTop: {
    position: 'absolute',
    top: 65,
    left: 20
  },
}

const mapStateToProps = (state) => {
  const sortData = _.map(_.orderBy(state.api.trendingData, ['value'], ['desc']), _.values);

  const items = _.map(sortData, (val, uid) => {
    return { ...val, uid };
  })
  return { items };
}

export default connect(mapStateToProps, actions)(Search);

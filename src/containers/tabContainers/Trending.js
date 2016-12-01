import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ListView,
  LayoutAnimation
} from 'react-native';

import TrendingItem from './TrendingItem';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Trending extends Component {

  state = {
    leadingItem: '',
    second: '',
    leadingPercent: 0
  }

  componentWillMount() {
    this.props.pullTrendingData();
    this.createDataSource(this.props);
    this.findLeadingItem(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
    this.findLeadingItem(nextProps)
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

  findLeadingItem(data) {
    if (data.items[0][0]) {
      const percent = _.round((data.items[0][1] / data.items[1][1]), 2)
      this.setState({
        leadingItem: data.items[0][0],
        second: data.items[1][0],
        leadingPercent: percent
      })
    }
  }

  render() {
    // console.log(this.props.trendingData.trendingData);
    const { skeleton, centerEverything, container, listViewContainer, makeItTop,
    textContainer, titleContainer, descContainer, title, desc, listContainer, statusContainer, statusText } = styles;

    return(
      <View style={[container]}>
        <View style={[centerEverything, textContainer]}>
          <View style={descContainer}>
            <Text style={[desc]}>What do tech advocates care most now?</Text>
          </View>
        </View>
        <View style={[listContainer]}>
          <ListView
            contentContainerStyle={listViewContainer}
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </View>
        <View style={statusContainer}>
          <Text style={statusText}>{this.state.leadingItem} seems to be the most popular thing right now followed by {this.state.second} by {this.state.leadingPercent} times!</Text>
        </View>
      </View>
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
    marginTop: 110
  },
  listContainer: {
    flex: 9,
    padding: 12,
    marginBottom: 50
  },
  listViewContainer: {
    paddingTop: 20
  },
  makeItTop: {
    position: 'absolute',
    top: 65,
    left: 20
  },
  textContainer: {
    flex: 1
  },
  titleContainer: {
    width: deviceWidth*0.8,
  },
  descContainer: {
    width: deviceWidth*0.6,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    textAlign: 'center'
  },
  desc: {
    color: 'grey',
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'center'
  },
  statusContainer: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    height: 50,
    backgroundColor: '#221F1F',
    justifyContent: 'center'
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    paddingLeft: 10,
    fontWeight: '500'
  }
}

const mapStateToProps = (state) => {
  const sortData = _.map(_.orderBy(state.api.trendingData, ['value'], ['desc']), _.values);

  const items = _.map(sortData, (val, uid) => {
    return { ...val, uid };
  })
  return { items };
}

export default connect(mapStateToProps, actions)(Trending);

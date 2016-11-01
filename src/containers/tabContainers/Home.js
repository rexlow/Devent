import _ from 'lodash';
import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import {
  View,
  Text,
  TouchableOpacity,
  ListView
} from 'react-native';

import {
  Spinner
} from './../../components/common';

import EventItem from './EventItem';

class Home extends Component {

  componentWillMount() {
    this.props.pullEventData();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ events }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(events);
  }

  //return arrays of event from events
  renderRow(event) {
    return <EventItem event={event} />;
  }

  render() {
    return(
      <ListView
        contentContainerStyle={styles.container}
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    )
  }
}

const styles = {
  container: {
    // flex: 1, //disable flex to scroll
    backgroundColor: '#F5F6F7',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 80
  },
  title: {
    fontSize: 38,
    letterSpacing: 9,
    fontFamily: 'HelveticaNeue-Light',
    paddingBottom: 10
  },
  desc: {
    fontSize: 16,
    letterSpacing: 0,
    fontFamily: 'HelveticaNeue-Thin',
    paddingBottom: 10
  }
}

const mapStateToProps = (state) => {
  console.log(state.api)
  const events = _.map(state.api, (val, uid) => {
    return {...val, uid};
  })

  return { events };
};

export default connect(mapStateToProps, actions)(Home);

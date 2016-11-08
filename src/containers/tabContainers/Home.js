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
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.listViewContainer}
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    marginTop: 110,
  },
  listViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  console.log(state.api.eventList)
  const events = _.map(state.api.eventList, (val, uid) => {
    return {...val, uid};
  })

  return { events };
};

export default connect(mapStateToProps, actions)(Home);

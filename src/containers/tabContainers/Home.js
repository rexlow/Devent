import _ from 'lodash';
import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import {
  View,
  Text,
  TouchableOpacity,
  ListView,
  RefreshControl
} from 'react-native';

import {
  Spinner
} from './../../components/common';

import EventItem from './EventItem';

class Home extends Component {

  state = { isRefreshing: false }

  componentWillMount() {
    this.props.getUserGroup();
    this.props.pullEventData();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
    if (nextProps) {
      this.setState({ isRefreshing: false })
    }
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

  onRefresh = () => {
    this.setState({ isRefreshing: true });
    this.props.pullEventData()
  }

  render() {
    return(
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.listViewContainer}
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
              title="Loading data..."
              progressBackgroundColor="#ffff00"
            />
          }
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
  console.log(state)

  //had to use pickBy instead of filter because of data mutation
  const filteredEvents = _.pickBy(state.api.eventList, {'approved': true})

  const events = _.map(filteredEvents, (val, uid) => {
    return {...val, uid};
  })
  return { events };
};

export default connect(mapStateToProps, actions)(Home);

import _ from 'lodash';
import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ListView,
  RefreshControl
} from 'react-native';

import ActionButton from 'react-native-action-button';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const search = (<MaterialIcon name="search" size={33} color="white" />)

import {
  Spinner
} from './../../components/common';

import EventItem from './EventItem';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

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
      this.setState({ isRefreshing: false, searchText: '' })
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

  setSearchText(event) {
    let searchText = event.nativeEvent.text;

    var eventLength = this.props.events.length

    //~ return -1 if query not found, found when >= 0
    const filteredEvents = this.props.events.filter(event => ~event.title.indexOf(searchText))

    if (filteredEvents) {
      var events = filteredEvents
      this.createDataSource({ events })
    } else {
      var events = [] //return empty object as react native list view required
      this.createDataSource({ events })
    }

    this.setState({ searchText })
  }

  render() {
    const { skeleton, container, listViewContainer, searchBarContainer, listContainer, searchBar } = styles
    return(
      <View style={[container]}>
        <View style={[searchBarContainer]}>
          <TextInput
             style={searchBar}
             value={this.state.searchText}
             onChange={this.setSearchText.bind(this)}
             placeholder="Search Event " />
        </View>
        <View style={listContainer}>
          <ListView
            contentContainerStyle={listViewContainer}
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
      </View>
    )
  }
}

const styles = {
  skeleton: {
    borderWidth: 1,
    borderColor: 'blue'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    marginTop: 110,
  },
  searchBarContainer: {
    flex: 0.7,
    width: deviceWidth
  },
  searchBar: {
    paddingLeft: 30,
    fontSize: 16,
    height: 35,
    width: deviceWidth,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#E4E4E4',
  },
  listContainer: {
    flex: 9.3,
    width: deviceWidth
  },
  listViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}

const mapStateToProps = (state) => {
  // console.log(state)

  //had to use pickBy instead of filter because of data mutation
  const filteredEvents = _.pickBy(state.api.eventList, {'approved': true})

  const events = _.map(filteredEvents, (val, uid) => {
    return {...val, uid};
  })
  return { events };
};

export default connect(mapStateToProps, actions)(Home);

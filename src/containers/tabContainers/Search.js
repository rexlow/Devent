import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ListView,
  RefreshControl
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

import EventItem from './EventItem';

class Search extends Component {

  state = { isRefreshing: false, searchText: '' }

  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
    if (nextProps) {
      this.setState({ isRefreshing: false })
    }
  }

  createDataSource({ events }) {
    console.log(events);
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
   this.setState({ searchText })

   var eventLength = this.props.events.length
   var events = this.props.events

   const filteredEvents = this.props.events.filter(search)
   console.log(filteredEvents);

   function search() {
     for (var i = 0; i < eventLength; i++) {
       if (events[i].title === searchText) {
         console.log(events[i].title)
         return events[i];
       }
     }
   }

  }

  render() {
    const { skeleton, centerEverything, container, listViewContainer, makeItTop,
    textContainer, titleContainer, descContainer, title, desc, listContainer } = styles;

    return(
      <View style={[container, centerEverything]}>
        <TextInput
           style={styles.searchBar}
           value={this.state.searchText}
           onChange={this.setSearchText.bind(this)}
           placeholder="Search" />
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
    marginTop: 65,
  },
  listViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchBar: {
    paddingLeft: 30,
    fontSize: 16,
    height: 40,
    width: deviceWidth,
    // flex: .1,
    borderWidth: 5,
    borderColor: '#E4E4E4',
  },
  listContainer: {
    flex: 8,
    padding: 10
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
    flex: 2
  },
  titleContainer: {
    width: deviceWidth*0.8,
  },
  descContainer: {
    width: deviceWidth*0.6,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    textAlign: 'center'
  },
  desc: {
    color: 'grey',
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'center'
  },
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

export default connect(mapStateToProps, actions)(Search);

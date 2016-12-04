'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import {
  Alert,
  View,
  ListView,
  RefreshControl,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const update = (<MaterialIcon name="done" size={28} color="white" />)

import { Input, Spinner } from './../../../components/common';
import ButtonComponent from 'react-native-button-component';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../../actions';
import firebase from 'firebase';

import EventItem from './../EventItem';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class ManageCreatedEvent extends Component {

  state = {
    isRefreshing: false,
    totalJoinedEvent: 0,
    totalSpending: 0
  }

  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
    if (nextProps) {
      this.setState({ isRefreshing: false })
    }
  }

  createDataSource({ createdEvent }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(createdEvent);
  }

  //return arrays of event from events
  renderRow(event) {
    return <EventItem event={event} />;
  }

  render() {
    const { centerEverything, skeleton, container, textContainer, contentContainer, listViewContainer, buttonContainer,
      propWidth, titleContainer, descContainer, title, editTitle, desc, buttonStyle, statusContainer, statusText } = styles;
    return (
      <View style={[centerEverything, container]}>
        <View style={[centerEverything, textContainer]}>
          <View style={titleContainer}>
            <Text style={[title]}>Event Editor</Text>
          </View>
          <View style={descContainer}>
            <Text style={[desc]}>Update your event like a breeze!</Text>
          </View>
        </View>
        <View style={[contentContainer]}>
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
        <ActionButton
          buttonColor="rgba(240,0,0,1)"
          offsetX={0}
          offsetY={0}
          icon={update} />
      </View>
    )
  }
}

const styles = {
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  skeleton: {
    borderWidth: 1,
    borderColor: 'red'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F6F7',
    marginTop: 44
  },
  textContainer: {
    flex: 2,
    marginTop: 20
  },
  propWidth: {
    width: deviceWidth*0.8
  },
  contentContainer: {
    flex: 8,
    width: deviceWidth,
    marginBottom: 50
  },
  listViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 20
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
  editTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'left',
    paddingBottom: 10
  },
  desc: {
    color: 'grey',
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'center'
  },
  buttonStyle: {
    height: 40,
    width: deviceWidth*0.7,
    borderRadius: 20,
    margin: 3
  }
}

const mapStateToProps = (state) => {
  var createdEvent = []
  const currentUser = state.auth.user.uid

  if (state.api.eventList) {
    let eventList = state.api.eventList
    Object.keys(eventList).forEach(
      (key) => (_.isMatch(eventList[key].eventOwner, currentUser)) && (createdEvent.push({ ...eventList[key] }))
    )
  }

  return { createdEvent }
}

export default connect(mapStateToProps, actions)(ManageCreatedEvent);

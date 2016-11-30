'use strict';
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
import { Input, Spinner } from './../../../components/common';
import ButtonComponent from 'react-native-button-component';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../../actions';
import firebase from 'firebase';

import EventItem from './../EventItem';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class ManageEvent extends Component {

  state = { isRefreshing: false }

  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
    if (nextProps) {
      this.setState({ isRefreshing: false })
    }
  }

  createDataSource({ joinedEvent }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(joinedEvent);
  }

  //return arrays of event from events
  renderRow(event) {
    return <EventItem event={event} />;
  }

  render() {
    const { centerEverything, skeleton, container, textContainer, contentContainer, listViewContainer, buttonContainer,
      propWidth, titleContainer, descContainer, title, editTitle, desc, buttonStyle } = styles;
    return (
      <View style={[centerEverything, container, skeleton]}>
        <View style={[centerEverything, textContainer, skeleton]}>
          <View style={titleContainer}>
            <Text style={[title]}>Event Place</Text>
          </View>
          <View style={descContainer}>
            <Text style={[desc]}>One place to manage all your events.</Text>
          </View>
        </View>
        <View style={[contentContainer, skeleton]}>
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
        <View style={[buttonContainer]}>
          <ButtonComponent
            style={buttonStyle}
            type='primary'
            shape='rectangle'
            text="ADD EVENT"
            onPress={() => Actions.addEvent()}
          />
        </View>
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
    marginBottom: 62 //prevent collision with button
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
  },
}

const mapStateToProps = (state) => {
  let unfilteredJoinedEvent = state.profile.userGroup.joinedEvent
  let eventList = state.api.eventList

  var joinedEvent = []

  Object.keys(eventList).forEach(
    (key) => unfilteredJoinedEvent[key] && (joinedEvent.push({ ...eventList[key] }))
  )

  return { joinedEvent }
}

export default connect(mapStateToProps, actions)(ManageEvent);

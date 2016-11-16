import _ from 'lodash';
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  ListView,
  TouchableWithoutFeedback,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../../actions';

import AdminEventItem from './AdminEventItem';

class AdminPanel extends Component {

  componentWillMount() {
    this.createDataSource(this.props)
  }

  createDataSource({ events }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(events);
  }

  renderRow(event) {
    return <AdminEventItem event={event} />;
  }

  render() {
    const { centerEverything, container, listViewContainer } = styles;
    return (
      <View style={[container]}>
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
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    marginTop: 64
  },
  listViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}

const mapStateToProps = (state) => {
  const events = _.map(state.api.eventList, (val, uid) => {
    return {...val, uid};
  });
  return { events };
}
export default connect(mapStateToProps, actions)(AdminPanel);

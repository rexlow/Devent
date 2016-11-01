import _ from 'lodash';
import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Spinner
} from './../../components/common';

class Home extends Component {

  componentWillMount() {
    this.props.pullEventData();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ events }){
    console.log('events ' + events)
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Devent</Text>
        <Text style={styles.desc}>Home</Text>
        <Spinner size="small"/>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    justifyContent: 'center',
    alignItems: 'center'
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
  const events = _.map(state.api, (val, title) => {
    return {...val, title};
  })

  return { events };
};

export default connect(mapStateToProps, actions)(Home);

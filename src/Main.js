import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import {
  View,
  Text,
  StatusBar
} from 'react-native';

class Main extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={styles.mainContainer}>
          <StatusBar barStyle="light-content"/>

        </View>
      </Provider>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)'
  }
}

export default Main;

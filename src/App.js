'use strict';
console.disableYellowBox = true;
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import reducers from './reducers';
import Router from './Router';

class App extends Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyA_jrPdLZQ3R3y6Oqu9ouYZh9NoHjSoC3o",
      authDomain: "devent-7da1c.firebaseapp.com",
      databaseURL: "https://devent-7da1c.firebaseio.com",
      storageBucket: "devent-7da1c.appspot.com",
      messagingSenderId: "870675382955"
    });
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk), autoRehydrate());
    persistStore(store, {storage: AsyncStorage})
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;

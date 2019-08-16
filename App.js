import React, { Component } from 'react';
import { View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import LoginView from './src/views/LoginView';
import CreateNewListView from './src/views/CreateNewListView';
import CreateNewToDoView from './src/views/CreateNewToDoView';
import OpenExistingListView from './src/views/OpenExistingListView';
import HomeView from './src/views/HomeView';
import EditExistingListView from './src/views/EditExistingListView';

import rootReducer from './src/reducers/';

const logger = createLogger();

export const store = createStore(rootReducer, applyMiddleware(logger));

const AppNavigator = createStackNavigator(
  {
    Login: LoginView,
    Home: HomeView,
    CreateNewList: CreateNewListView,
    CreateNewToDo: CreateNewToDoView,
    OpenExistingList: OpenExistingListView,
    EditExistingList: EditExistingListView,
  },
  {
    initialRouteName: 'Login',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

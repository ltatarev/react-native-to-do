import React, { PureComponent } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import LoginView from './src/views/LoginView';
import CreateNewListView from './src/views/CreateNewListView';
import CreateNewToDoView from './src/views/CreateNewToDoView';
import OpenExistingListView from './src/views/OpenExistingListView';
import HomeView from './src/views/HomeView';
import EditExistingListView from './src/views/EditExistingListView';

import rootReducer from './src/reducers';
const logger = createLogger();

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, applyMiddleware(logger));
export const persistor = persistStore(store);
/* persistor.purge(); */

/* export const store = createStore(rootReducer, applyMiddleware(logger));
 */

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginView,
      navigationOptions: {
        header: null,
      },
    },
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

const persistenceKey = 'persistenceKey';
const persistNavigationState = async navState => {
  try {
    await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState));
  } catch (err) {
    // handle the error according to your needs
  }
};
const loadNavigationState = async () => {
  const jsonString = await AsyncStorage.getItem(persistenceKey);
  return JSON.parse(jsonString);
};

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppContainer
        persistNavigationState={persistNavigationState}
        loadNavigationState={loadNavigationState}
      />
    </PersistGate>
  </Provider>
);

export default App;

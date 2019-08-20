import React, { Component } from 'react';
import { View } from 'react-native';

import Home from '../components/Home';

export default class HomeView extends Component {
  static navigationOptions = {
    headerTitle: 'Home',
    headerLeft: null,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Home />
      </View>
    );
  }
}

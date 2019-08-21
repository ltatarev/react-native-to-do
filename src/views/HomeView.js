import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Home from '../components/Home';

export default class HomeView extends Component {
  static navigationOptions = {
    headerTitle: '🏠',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#C4CDDF',
      borderBottomWidth: 0,
    },
    headerTitleStyle: { color: 'white' },
  };

  render() {
    return (
      <View style={styles.container}>
        <Home />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C4CDDF',
  },
});

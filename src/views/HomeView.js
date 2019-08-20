import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Home from '../components/Home';

export default class HomeView extends Component {
  static navigationOptions = {
    headerTitle: '🏠',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#A37E9B',
    },
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
    backgroundColor: '#E0ACD5',
  },
});

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import OpenExistingList from '../components/OpenExistingList';

export default class OpenExistingListView extends Component {
  static navigationOptions = {
    headerTitle: 'Open existing list 🔖',
    headerStyle: {
      backgroundColor: '#D58A81',
    },
    headerBackTitle: '🔖',
  };

  render() {
    return (
      <View style={styles.container}>
        <OpenExistingList />
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
    backgroundColor: '#F9B5AC',
  },
});

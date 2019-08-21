import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import CreateNewToDo from '../components/CreateNewToDo';

export default class CreateNewTodoView extends Component {
  static navigationOptions = {
    headerTitle: 'Create new task 📑',
    headerStyle: {
      backgroundColor: '#DAD9E2',
      borderBottomWidth: 0,
    },
    headerBackTitle: '📑',
  };

  render() {
    return (
      <View style={styles.container}>
        <CreateNewToDo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DAD9E2',
  },
});

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import CreateNewList from '../components/CreateNewList';

class CreateNewListView extends Component {
  static navigationOptions = {
    headerTitle: 'Create new list 📃',
    headerStyle: {
      backgroundColor: '#66CBBB',
    },
    headerBackTitle: '📃',
  };

  render() {
    return (
      <View style={styles.container}>
        <CreateNewList />
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
    backgroundColor: '#B3DFD8',
  },
});

export default connect()(withNavigation(CreateNewListView));

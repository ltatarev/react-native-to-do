import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import CreateNewList from '../components/CreateNewList';

class CreateNewListView extends Component {
  static navigationOptions = {
    headerTitle: '📃',
    headerStyle: {
      backgroundColor: '#539C90',
    },
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
    backgroundColor: '#6AC8B9',
  },
});

export default connect()(withNavigation(CreateNewListView));

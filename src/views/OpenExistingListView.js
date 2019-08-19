import React, { Component } from 'react';
import { View } from 'react-native';

import OpenExistingList from '../components/OpenExistingList';

export default class OpenExistingListView extends Component {
  static navigationOptions = {
    headerTitle: 'Open existing list',
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <OpenExistingList />
      </View>
    );
  }
}

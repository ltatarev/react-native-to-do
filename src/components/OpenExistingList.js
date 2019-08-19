import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Button, FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import { setCurrentList } from '../actions/addList';

class OpenExistingList extends Component {
  setCurrentList = (userId, id) => {
    this.props.setCurrentList(userId, id);
    this.props.navigation.navigate('EditExistingList', {
      currentListId: id,
    });
  };

  render() {
    let listLen = this.props.lists.length;
    return (
      <View style={styles.container}>
        <Text>{listLen ? '' : 'No lists created yet :('}</Text>
        <FlatList
          data={this.props.lists}
          renderItem={({ item }) => (
            <Button
              onPress={() => this.setCurrentList(item.userId, item.id)}
              title={item.name}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    lists: state.currentUserReducer
      ? state.listReducer.filter(
          list => list.userId === state.currentUserReducer[0].currentUser,
        )
      : null,
  };
};

export default connect(
  mapStateToProps,
  { setCurrentList },
)(withNavigation(OpenExistingList));

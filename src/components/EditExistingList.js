import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { StyleSheet, Button, View, Text, FlatList } from 'react-native';

class EditExistingList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.todos}
          renderItem={({ item }) => (
            <Button
              onPress={() => {
                this.props.navigation.navigate('EditExistingList');
              }}
              title={item.name}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate('CreateNewToDo');
          }}
          title="Add new task"
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
    todos: state.todos,
  };
};

export default connect(
  mapStateToProps,
  null,
)(withNavigation(EditExistingList));

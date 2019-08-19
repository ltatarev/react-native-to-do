import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import {
  StyleSheet,
  Button,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { toggleTodo } from '../actions/addTodo';

class EditExistingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListId: this.getNavigationParams().currentListId,
    };
  }

  getNavigationParams() {
    return this.props.navigation.state.params || {};
  }

  toggleTodo = id => {
    this.props.toggleTodo(id);
  };

  render() {
    const todoLen = this.props.todos.length;
    return (
      <View style={styles.container}>
        <Text>{todoLen ? '' : 'No tasks created yet :('}</Text>
        <FlatList
          data={this.props.todos}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                this.toggleTodo(item.id);
              }}
            >
              <Text
                style={{
                  textDecorationLine: item.completed ? 'line-through' : 'none',
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate('CreateNewToDo', {
              currentListId: this.state.currentListId,
            });
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
    todos: state.currentUserReducer
      ? state.todoReducer.filter(
          todo => todo.listId === state.currentUserReducer[0].currentList,
        )
      : null,
  };
};

export default connect(
  mapStateToProps,
  { toggleTodo },
)(withNavigation(EditExistingList));

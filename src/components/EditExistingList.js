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

import PropTypes from 'prop-types';
import actions from '../actions';
import selectCurrentList from '../selectors';

class EditExistingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListId: this.getNavigationParams().currentListId,
    };
  }

  static get propTypes() {
    return {
      navigation: PropTypes.any,
      todos: PropTypes.any,
      toggleTodoDispatch: PropTypes.func,
    };
  }

  getNavigationParams() {
    const { navigation } = this.props;
    return navigation.state.params || {};
  }

  render() {
    const { todos, toggleTodoDispatch, navigation } = this.props;
    const { currentListId } = this.state;
    const todoLen = todos.length;
    return (
      <View style={styles.container}>
        <Text>{todoLen ? '' : 'No tasks created yet 😕'}</Text>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                toggleTodoDispatch(item.id);
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
            navigation.navigate('CreateNewToDo', {
              currentListId,
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

const mapStateToProps = state => ({
  todos: state.todoReducer.filter(
    todo => todo.listId === selectCurrentList(state),
  ),
});

const mapDispatchToProps = dispatch => ({
  toggleTodoDispatch: id => dispatch(actions.toggleTodo(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(EditExistingList));

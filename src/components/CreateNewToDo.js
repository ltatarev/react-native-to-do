import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, Button } from 'react-native';

import PropTypes from 'prop-types';
import actions from '../actions';
import services from '../services';

class CreateNewToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoText: '',
      currentListId: this.getNavigationParams().currentListId,
    };
  }

  static get propTypes() {
    return {
      navigation: PropTypes.any,
      addTodoDispatch: PropTypes.func,
      todos: PropTypes.any,
    };
  }

  getNavigationParams() {
    const { navigation } = this.props;
    return navigation.state.params || {};
  }

  addNewTodo(todoText) {
    const { addTodoDispatch, navigation, todos } = this.props;
    const { currentListId } = this.state;
    const id = services.nextTodoId(todos);
    addTodoDispatch(id, todoText, currentListId);

    this.setState({ todoText: '' });
    navigation.navigate('EditExistingList', {
      currentListId,
    });
  }

  render() {
    const { todoText } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={{ padding: 10, fontSize: 20 }}
          placeholder="Add new task"
          onChangeText={text => this.setState({ todoText: text })}
          value={todoText}
        />

        <Button
          onPress={() => {
            this.addNewTodo(todoText);
          }}
          title="+"
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
  todos: state.todoReducer,
});

const mapDispatchToProps = dispatch => ({
  addTodoDispatch: (id, name, listId) => {
    dispatch(actions.addTodo(id, name, listId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(CreateNewToDo));

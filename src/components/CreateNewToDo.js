import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';
import actions from '../actions';
import services from '../services';

class CreateNewToDo extends Component {
  constructor(props) {
    super(props);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {
      todoName: '',
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

  addNewTodo() {
    const { addTodoDispatch, navigation, todos } = this.props;
    const { currentListId, todoName } = this.state;
    // assign proper id
    const id = services.nextTodoId(todos);
    // add new todo
    addTodoDispatch(id, todoName, currentListId);
    // reseting state and navigating with param
    this.setState({ todoName: '' });
    navigation.navigate('EditExistingList', {
      currentListId,
    });
  }

  // checks if input is empty
  disabled() {
    const { todoName } = this.state;
    return !todoName || !todoName.match('[^\\s]+');
  }

  handleTextChange(name) {
    this.setState({ todoName: name });
  }

  render() {
    const { todoName } = this.state;
    return (
      <View>
        <TextInput
          style={{ padding: 10, fontSize: 20 }}
          placeholder="Add new task"
          onChangeText={this.handleTextChange}
          value={todoName}
        />

        <TouchableOpacity
          style={
            this.disabled() ? styles.submitButtonDisabled : styles.submitButton
          }
          disabled={this.disabled()}
          onPress={this.addNewTodo}
        >
          <Text
            style={
              this.disabled() ? styles.submitTextDisabled : styles.submitText
            }
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  submitButton: {
    margin: 10,
    height: 30,
    width: 30,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#80A0CE',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
    margin: 10,
    height: 30,
    width: 30,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#80A0CE',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: -6,
    color: 'white',
  },
  submitTextDisabled: {
    opacity: 0.5,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: -6,
    color: 'white',
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

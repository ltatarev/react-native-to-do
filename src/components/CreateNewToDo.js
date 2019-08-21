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
      <View>
        <TextInput
          style={{ padding: 10, fontSize: 20 }}
          placeholder="Add new task"
          onChangeText={text => this.setState({ todoText: text })}
          value={todoText}
        />

        <TouchableOpacity
          style={styles.addNew}
          disabled={!todoText || !!todoText.match('\\s+')}
          onPress={() => this.addNewTodo(todoText)}
        >
          <Text style={styles.addNewText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addNew: {
    margin: 10,
    height: 30,
    width: 30,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#D1A2DC',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: -6,
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

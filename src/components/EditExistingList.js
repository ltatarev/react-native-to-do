import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';
import actions from '../actions';
import selectors from '../selectors';

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
      <View>
        <TouchableOpacity
          style={styles.addNew}
          onPress={() => {
            navigation.navigate('CreateNewToDo', {
              currentListId,
            });
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>+</Text>
        </TouchableOpacity>
        <Text style={styles.none}>
          {todoLen ? '' : 'No tasks created yet 😕'}
        </Text>
        <FlatList
          style={styles.list}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  none: {
    fontSize: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  addNew: {
    margin: 10,
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#A35DE1',
    borderRadius: 25,
  },
  list: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
  },
});

const mapStateToProps = state => ({
  todos: state.todoReducer.filter(
    todo => todo.listId === selectors.selectCurrentList(state),
  ),
});

const mapDispatchToProps = dispatch => ({
  toggleTodoDispatch: id => dispatch(actions.toggleTodo(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(EditExistingList));

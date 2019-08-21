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

  keyExtractor = (item, index) => index.toString();

  render() {
    const { todos, toggleTodoDispatch, navigation } = this.props;
    const { currentListId } = this.state;
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
          <Text style={styles.addNewText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.noneCreated}>
          {todos.length ? '' : 'No tasks created yet 😕'}
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
                style={Object.assign(
                  {
                    textDecorationLine: item.completed
                      ? 'line-through'
                      : 'none',
                  },
                  styles.todo,
                )}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noneCreated: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'Avenir',
    fontStyle: 'italic',
  },
  addNew: {
    margin: 10,
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#4E8ECE',
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
    color: 'white',
  },
  list: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
  },
  todo: { fontSize: 20, letterSpacing: 2, padding: 10 },
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

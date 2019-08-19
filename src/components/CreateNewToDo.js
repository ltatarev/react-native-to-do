import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, Button } from 'react-native';

import { addTodo, ADD_TODO } from '../actions/addTodo';

class CreateNewToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      currentListId: this.getNavigationParams().currentListId,
    };
  }

  getNavigationParams() {
    return this.props.navigation.state.params || {};
  }

  addNewTodo = (text, currentListId) => {
    this.props.addTodo(text, currentListId);
    this.setState({ text: '' });
    this.props.navigation.navigate('EditExistingList', {
      currentListId: this.state.currentListId,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ padding: 10, fontSize: 20 }}
          placeholder="Add new task"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          onPress={() => {
            this.addNewTodo(this.state.text, this.state.currentListId);
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

export default connect(
  null,
  { addTodo },
)(withNavigation(CreateNewToDo));

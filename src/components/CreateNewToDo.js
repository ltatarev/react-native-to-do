import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, Button } from 'react-native';

import { addTodo, ADD_TODO } from '../actions/addTodo';

class CreateNewToDo extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  addNewTodo = text => {
    this.props.addTodo(text);
    this.setState({ text: '' });
    this.props.navigation.navigate('EditExistingList');
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
            this.addNewTodo(this.state.text);
          }}
          title="Add to do"
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

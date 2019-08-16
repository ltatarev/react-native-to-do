import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Button, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addList, ADD_LIST } from '../actions/addList';

const mapDispatchToProps = dispatch => {
  return {
    addList: listName => {
      dispatch({ type: ADD_LIST, payload: listName });
    },
  };
};

class CreateNewList extends Component {
  constructor(props) {
    super(props);
    this.state = { listName: '' };
  }

  addNewList = listName => {
    this.props.addList(listName);
    this.setState({ listName: '' });
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ padding: 10, fontSize: 20 }}
          placeholder="List name"
          onChangeText={listName => this.setState({ listName })}
          value={this.state.listName}
        />
        <Button
          onPress={() => {
            this.addNewList(this.state.listName);
          }}
          title="Add"
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
  { addList },
)(withNavigation(CreateNewList));

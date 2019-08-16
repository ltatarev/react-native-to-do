import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { StyleSheet, TextInput, View, Button } from 'react-native';
import { addUser, ADD_USER } from '../actions/addUser';

const mapDispatchToProps = dispatch => {
  return {
    addUser: username => dispatch({ type: ADD_USER, payload: username }),
  };
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  addNewUser = username => {
    this.props.addUser(username);
    let currentId = this.state.users
      .filter(e => e.username === this.state.username)
      .map(e => e.id);
    this.setState({ username: '' });
    this.props.navigation.navigate('Home', { userId: currentId });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ padding: 10, fontSize: 20 }}
          placeholder="Username"
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <Button
          onPress={() => {
            this.addNewUser(this.state.username);
          }}
          title="Submit"
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
  title: {
    justifyContent: 'center',
    padding: 20,
    fontSize: 30,
  },
});

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

export default connect(
  mapStateToProps,
  { addUser },
)(withNavigation(Login));

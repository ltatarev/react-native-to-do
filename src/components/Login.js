import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
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
    this.setState({ username: '' });
    this.props.navigation.navigate('Home');
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
        <TouchableOpacity
          disabled={
            !this.state.username ||
            (this.state.username.match('\\s+') ? true : false)
          }
          onPress={() => {
            this.addNewUser(this.state.username);
          }}
        >
          <Text>LOGIN</Text>
        </TouchableOpacity>
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

export default connect(
  null,
  { addUser },
)(withNavigation(Login));

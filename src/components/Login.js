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
import { addUser, login } from '../actions/addUser';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  addNewUser = username => {
    if (this.existingUserId(username) != null) {
      this.props.login(this.existingUserId(username));
    } else {
      this.props.addUser(username);
    }
    this.setState({ username: '' });
    this.props.navigation.navigate('Home');
  };

  existingUserId(username) {
    const foundUsers = Object.values(this.props.users).filter(
      user => user.username === username,
    );
    if (foundUsers.length === 0) {
      return null;
    }
    return foundUsers[0].id;
  }

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

const mapStateToProps = state => {
  return { users: state.usersReducer };
};

export default connect(
  mapStateToProps,
  { addUser, login },
)(withNavigation(Login));

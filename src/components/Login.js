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
    if (this.userExists(username)) {
      this.props.login(this.getUserId(username));
    } else {
      this.props.addUser(username);
    }
    this.setState({ username: '' });
    this.props.navigation.navigate('Home');
  };

  userExists(username, currentName) {
    for (let name of Object.values(this.props.users)) {
      if (username === name.username) {
        return true;
      }
      return false;
    }
  }

  getUserId(username) {
    for (let name of Object.values(this.props.users)) {
      if (username === name.username) {
        return name.id;
      }
    }
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

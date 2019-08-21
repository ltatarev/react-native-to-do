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
import PropTypes from 'prop-types';

import actions from '../actions';
import services from '../services';

class Login extends Component {
  constructor(props) {
    super(props);
    this.addNewUser = this.addNewUser.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = { username: '' };
  }

  static get propTypes() {
    return {
      navigation: PropTypes.any,
      users: PropTypes.any,
      loginDispatch: PropTypes.func,
      addUserDispatch: PropTypes.func,
    };
  }

  // method for handling login
  addNewUser() {
    const { navigation, users, loginDispatch, addUserDispatch } = this.props;
    const { username } = this.state;
    const existingId = this.existingUserId();
    // check if user already exists
    if (existingId != null) {
      // login with userId
      loginDispatch(existingId);
    } else {
      // assign proper id
      const newId = services.nextUserId(users);
      // add new user
      addUserDispatch(newId, username);
    }
    this.setState({ username: '' });
    navigation.navigate('Home');
  }

  existingUserId() {
    const { users } = this.props;
    const { username } = this.state;
    const foundUsers = Object.values(users).filter(
      user => user.username === username,
    );
    if (foundUsers.length === 0) {
      return null;
    }
    return foundUsers[0].id;
  }

  // check if input is empty
  disabled() {
    const { username } = this.state;
    return !username || !!username.match('\\s+');
  }

  handleTextChange(name) {
    this.setState({ username: name });
  }

  render() {
    const { username } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={this.handleTextChange}
          value={username}
        />
        <TouchableOpacity
          style={
            this.disabled() ? styles.submitButtonDisabled : styles.submitButton
          }
          disabled={this.disabled()}
          onPress={this.addNewUser}
        >
          <Text
            style={
              this.disabled() ? styles.submitTextDisabled : styles.submitText
            }
          >
            LOGIN
          </Text>
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
  textInput: {
    justifyContent: 'center',
    padding: 20,
    fontSize: 25,
    letterSpacing: 2,
  },
  submitButton: {
    backgroundColor: '#80A0CE',
    borderRadius: 25,
  },
  submitButtonDisabled: {
    opacity: 0.5,
    backgroundColor: '#A9B8CE',
    borderRadius: 25,
  },
  submitText: {
    color: 'white',
    padding: 12,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    letterSpacing: 2,
  },
  submitTextDisabled: {
    opacity: 0.5,
    color: 'white',
    padding: 12,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    letterSpacing: 2,
  },
});

const mapStateToProps = state => ({ users: state.usersReducer });

const mapDispatchToProps = dispatch => ({
  addUserDispatch: (id, username) => {
    dispatch(actions.addUser(id, username));
  },
  loginDispatch: content => dispatch(actions.login(content)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Login));

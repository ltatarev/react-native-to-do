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

  addNewUser(username) {
    const { navigation, users, loginDispatch, addUserDispatch } = this.props;
    const existingId = this.existingUserId(username);
    if (existingId != null) {
      loginDispatch(existingId);
    } else {
      const newId = services.nextUserId(users);
      addUserDispatch(newId, username);
    }
    this.setState({ username: '' });
    navigation.navigate('Home');
  }

  existingUserId(username) {
    const { users } = this.props;
    const foundUsers = Object.values(users).filter(
      user => user.username === username,
    );
    if (foundUsers.length === 0) {
      return null;
    }
    return foundUsers[0].id;
  }

  render() {
    const { username } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.title}
          placeholder="Username"
          onChangeText={name => {
            this.setState({ username: name });
          }}
          value={username}
        />
        <TouchableOpacity
          style={styles.submit}
          disabled={!username || username.match('\\s+')}
          onPress={() => {
            this.addNewUser(username);
          }}
        >
          <Text style={styles.text}>LOGIN</Text>
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
    backgroundColor: '#c9d7f8',
  },
  title: {
    justifyContent: 'center',
    padding: 20,
    fontSize: 25,
    letterSpacing: 2,
  },
  submit: {
    backgroundColor: '#9AB7FC',
    borderRadius: 25,
  },
  text: {
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

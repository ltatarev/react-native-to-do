import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Login from '../components/Login';

class LoginView extends Component {
  static navigationOptions = {
    headerTitle: 'Login',
  };

  render() {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DAD9E2',
  },
});

export default connect()(withNavigation(LoginView));

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Login from '../components/Login';

class LoginView extends Component {
  static navigationOptions = {
    headerTitle: '',
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
    backgroundColor: '#c9d7f8',
  },
});

export default connect()(withNavigation(LoginView));

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import EditExistingList from '../components/EditExistingList';

const mapStateToProps = state => ({
  todos: state.todos,
});

class EditExistingView extends Component {
  static navigationOptions = {
    headerTitle: 'Edit existing list 📝',
    headerStyle: {
      backgroundColor: '#A8D2AB',
    },
    headerBackTitle: '📝',
  };

  render() {
    return (
      <View style={styles.container}>
        <EditExistingList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8E7D9',
  },
});

export default connect(
  mapStateToProps,
  null,
)(EditExistingView);

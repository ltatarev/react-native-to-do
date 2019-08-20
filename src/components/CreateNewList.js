import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Button, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../actions';
import services from '../services';
import selectCurrentUser from '../selectors';

class CreateNewList extends Component {
  constructor(props) {
    super(props);
    this.state = { listName: '' };
  }

  static get propTypes() {
    return {
      navigation: PropTypes.any,
      lists: PropTypes.any,
      currentUserId: PropTypes.any,
      addListDispatch: PropTypes.func,
    };
  }

  addNewList(name) {
    const { addListDispatch, navigation, lists, currentUserId } = this.props;
    const id = services.nextListId(lists);
    addListDispatch(id, name, currentUserId);
    this.setState({ listName: '' });
    navigation.navigate('Home');
  }

  render() {
    const { listName } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={{ padding: 10, fontSize: 20 }}
          placeholder="List name"
          onChangeText={name => {
            this.setState({ listName: name });
          }}
          value={listName}
        />
        <Button
          onPress={() => {
            this.addNewList(listName);
          }}
          title="Create list"
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

const mapStateToProps = state => ({
  currentUserId: selectCurrentUser(state),
  lists: state.listReducer,
});

const mapDispatchToProps = dispatch => ({
  addListDispatch: (id, name, userId) => {
    dispatch(actions.addList(id, name, userId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(CreateNewList));

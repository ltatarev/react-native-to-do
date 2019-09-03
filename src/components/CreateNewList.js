import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../actions';
import services from '../services';
import selectors from '../selectors';

class CreateNewList extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.addNewList = this.addNewList.bind(this);
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

  // method for handling submit
  addNewList() {
    const { addListDispatch, navigation, lists, currentUserId } = this.props;
    const { listName } = this.state;
    const id = services.nextListId(lists);
    addListDispatch(id, listName, currentUserId);
    this.setState({ listName: '' });
    navigation.navigate('Home');
  }

  // checks if input is empty
  disabled() {
    const { listName } = this.state;
    return !listName || !listName.match('[^\\s]+');
  }

  handleTextChange(name) {
    this.setState({ listName: name });
  }

  render() {
    const { listName } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="List name "
          onChangeText={this.handleTextChange}
          value={listName}
        />
        <TouchableOpacity
          style={
            this.disabled() ? styles.submitButtonDisabled : styles.submitButton
          }
          disabled={this.disabled()}
          onPress={this.addNewList}
        >
          <Text
            style={
              this.disabled() ? styles.submitTextDisabled : styles.submitText
            }
          >
            CREATE LIST
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
    backgroundColor: '#4E8ECE',
    borderRadius: 25,
  },
  submitButtonDisabled: {
    opacity: 0.5,
    backgroundColor: '#88B8E8',
    borderRadius: 25,
  },
  submitText: {
    padding: 12,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    color: 'white',
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

const mapStateToProps = state => ({
  currentUserId: selectors.selectCurrentUser(state),
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

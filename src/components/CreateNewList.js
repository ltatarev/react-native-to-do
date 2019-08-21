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
          style={styles.title}
          placeholder="List name"
          onChangeText={name => {
            this.setState({ listName: name });
          }}
          value={listName}
        />
        <TouchableOpacity
          style={styles.submit}
          disabled={!listName}
          onPress={() => {
            this.addNewList(listName);
          }}
        >
          <Text style={styles.text}>CREATE LIST</Text>
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
    fontSize: 25,
    letterSpacing: 2,
  },
  submit: {
    backgroundColor: '#66CBBB',
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

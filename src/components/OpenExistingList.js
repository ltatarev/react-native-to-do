import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import actions from '../actions';
import selectors from '../selectors';

class OpenExistingList extends PureComponent {
  static get propTypes() {
    return {
      lists: PropTypes.any,
      setCurrentListDispatch: PropTypes.func,
    };
  }

  // method for setting current list
  setCurrentList(userId, id) {
    const { navigation, setCurrentListDispatch } = this.props;
    setCurrentListDispatch(id, userId);
    navigation.navigate('EditExistingList', {
      currentListId: id,
    });
  }

  // render TouchableOpacity for menu items
  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => this.setCurrentList(item.userId, item.id)}
      key={item.key}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    const { lists } = this.props;
    return (
      <View>
        <Text style={styles.noneCreated}>
          {lists.length ? '' : 'No lists created yet 😕'}
        </Text>
        <FlatList
          data={lists}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
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
  noneCreated: {
    marginTop: 20,
    fontSize: 20,
    fontStyle: 'italic',
    fontFamily: 'Avenir',
  },
  itemText: {
    fontSize: 23,
    letterSpacing: 2,
    textTransform: 'uppercase',
    alignSelf: 'center',
    padding: 15,
  },
});

const mapStateToProps = state => ({
  lists: state.listReducer.filter(
    list => list.userId === selectors.selectCurrentUser(state),
  ),
});

const mapDispatchToProps = dispatch => ({
  setCurrentListDispatch: (id, userId) => {
    dispatch(actions.setCurrentList(id, userId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(OpenExistingList));

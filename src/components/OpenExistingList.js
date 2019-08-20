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

  setCurrentList(userId, id) {
    const { navigation, setCurrentListDispatch } = this.props;
    setCurrentListDispatch(id, userId);
    navigation.navigate('EditExistingList', {
      currentListId: id,
    });
  }

  renderItemToTouchOpac = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => this.setCurrentList(item.userId, item.id)}
      key={item.key}
    >
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  render() {
    const { lists } = this.props;
    const listLen = lists.length;
    return (
      <View>
        <Text style={styles.none}>
          {listLen ? '' : 'No lists created yet 😕'}
        </Text>
        <FlatList
          style={styles.list}
          data={lists}
          renderItem={this.renderItemToTouchOpac}
          keyExtractor={(item, index) => index.toString()}
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
  none: {
    fontSize: 20,
    marginTop: 20,
    fontStyle: 'italic',
  },
  text: {
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    alignSelf: 'auto',
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

import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Button, FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import actions from '../actions';

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

  render() {
    const { lists } = this.props;
    const listLen = lists.length;
    return (
      <View style={styles.container}>
        <Text>{listLen ? '' : 'No lists created yet :('}</Text>
        <FlatList
          data={lists}
          renderItem={({ item }) => (
            <Button
              onPress={() => this.setCurrentList(item.userId, item.id)}
              title={item.name}
            />
          )}
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
});

const mapStateToProps = state => {
  return {
    lists: state.listReducer.filter(
      list => list.userId === state.currentUserReducer[0].currentUser,
    ),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentListDispatch: (id, userId) => {
      dispatch(actions.setCurrentList(id, userId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(OpenExistingList));

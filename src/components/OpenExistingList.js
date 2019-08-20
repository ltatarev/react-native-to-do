import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Button, FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import actions from '../actions';
import selectCurrentList from '../selectors';

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

  renderItemToButton = ({ item }) => (
    <Button
      onPress={() => this.setCurrentList(item.userId, item.id)}
      title={item.name}
    />
  );

  render() {
    const { lists } = this.props;
    const listLen = lists.length;
    return (
      <View style={styles.container}>
        <Text>{listLen ? '' : 'No lists created yet :('}</Text>
        <FlatList
          data={lists}
          renderItem={this.renderItemToButton}
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

const mapStateToProps = state => ({
  lists: state.listReducer.filter(
    list => list.userId === selectCurrentList(state),
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

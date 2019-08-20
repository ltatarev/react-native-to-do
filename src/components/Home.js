import React, { PureComponent } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import actions from '../actions';

class Home extends PureComponent {
  static get propTypes() {
    return {
      navigation: PropTypes.any,
      currentUserId: PropTypes.any,
      logOutDispatch: PropTypes.func,
    };
  }

  renderItemToButton = ({ item }) => {
    const { currentUserId, navigation, logOutDispatch } = this.props;
    const userId = currentUserId;
    return (
      <Button
        onPress={() => {
          if (item.key === 'Log out') {
            logOutDispatch(userId);
            navigation.navigate(item.route);
          } else {
            navigation.navigate(item.route, {
              userId,
            });
          }
        }}
        title={item.key}
      />
    );
  };

  render() {
    const flatListData = [
      {
        key: 'Create new list',
        route: 'CreateNewList',
      },
      {
        key: 'Open existing',
        route: 'OpenExistingList',
      },
      { key: 'Log out', route: 'Login' },
    ];
    return (
      <View style={styles.container}>
        <FlatList data={flatListData} renderItem={this.renderItemToButton} />
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
    currentUserId: state.currentUserReducer[0].currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOutDispatch: id => {
      dispatch(actions.logOut(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Home));

import React, { PureComponent } from 'react';
import { TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import actions from '../actions';
import selectors from '../selectors';

class Home extends PureComponent {
  static get propTypes() {
    return {
      navigation: PropTypes.any,
      currentUserId: PropTypes.any,
      logOutDispatch: PropTypes.func,
    };
  }

  // rendering onPress function for menu items (navigation or log out)
  renderOnPress = ({ item }) => {
    const { currentUserId, navigation, logOutDispatch } = this.props;
    const userId = currentUserId;
    if (item.key === 'Log out') {
      // logs out user and redirects to loginView
      logOutDispatch(userId);
      navigation.navigate(item.route);
    } else {
      // navigates to create or open list with param userId
      navigation.navigate(item.route, {
        userId,
      });
    }
  };

  // rendering TouchableOpacity for menu items
  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => this.renderOnPress({ item })}
      key={item.key}
    >
      <Text
        style={item.key === 'Log out' ? styles.logOutText : styles.menuItemText}
      >
        {item.key}
      </Text>
    </TouchableOpacity>
  );

  keyExtractor = (item, index) => index.toString();

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
      <FlatList
        data={flatListData}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  menuItem: {
    alignSelf: 'center',
    padding: 10,
  },
  menuItemText: {
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  logOutText: {
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#C4030C',
  },
});

const mapStateToProps = state => ({
  currentUserId: selectors.selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
  logOutDispatch: id => {
    dispatch(actions.logOut(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Home));

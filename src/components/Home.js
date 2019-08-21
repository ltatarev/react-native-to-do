import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import actions from '../actions';
import selectors from '../selectors';

class Home extends PureComponent {
  static get propTypes() {
    return {
      navigation: PropTypes.any,
      username: PropTypes.any,
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

  // render TouchableOpacity for menu items
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
    const { username } = this.props;
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
      <View style={styles.menu}>
        <Text style={Object.assign({}, styles.menuItem, styles.menuTitle)}>
          <Text>Hello {username}!</Text>
        </Text>
        <View style={styles.menu}>
          <FlatList
            data={flatListData}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  menuItem: {
    alignSelf: 'center',
    padding: 10,
  },
  menuTitle: {
    margin: 50,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 30,
    letterSpacing: 3,
    fontFamily: 'Avenir',
  },
  menuItemText: {
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontSize: 17,
  },
  logOutText: {
    fontSize: 17,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#C4030C',
  },
});

const mapStateToProps = state => ({
  username: selectors.selectCurrentUsername(state),
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

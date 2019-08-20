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

  renderButtonOnPress = ({ item }) => {
    const { currentUserId, navigation, logOutDispatch } = this.props;
    const userId = currentUserId;
    if (item.key === 'Log out') {
      logOutDispatch(userId);
      navigation.navigate(item.route);
    } else {
      navigation.navigate(item.route, {
        userId,
      });
    }
  };

  renderItemToTouchOpac = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => this.renderButtonOnPress({ item })}
      key={item.key}
    >
      <Text style={item.key === 'Log out' ? styles.log : styles.text}>
        {item.key}
      </Text>
    </TouchableOpacity>
  );

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
      <FlatList data={flatListData} renderItem={this.renderItemToTouchOpac} />
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    padding: 10,
  },
  text: {
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  log: {
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

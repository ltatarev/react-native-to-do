import React, { Component } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { logOut } from '../actions/addUser';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {
              key: 'Create new list',
              route: 'CreateNewList',
              param: this.props.currentUserId,
            },
            {
              key: 'Open existing',
              route: 'OpenExistingList',
              param: this.props.currentUserId,
            },
            { key: 'Log out', route: 'Login' },
          ]}
          renderItem={({ item }) => (
            <Button
              onPress={() => {
                if (item.key === 'Log out') {
                  this.props.logOut(this.props.currentUserId);
                  this.props.navigation.navigate(item.route);
                } else {
                  this.props.navigation.navigate(item.route, {
                    userId: item.param,
                  });
                }
              }}
              title={item.key}
            />
          )}
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
    currentUserId: state.currentUserReducer
      ? state.currentUserReducer[0].currentUser
      : null,
  };
};

export default connect(
  mapStateToProps,
  { logOut },
)(withNavigation(Home));

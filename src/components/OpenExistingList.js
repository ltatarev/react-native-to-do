import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Button, FlatList, View } from 'react-native';
import { connect } from 'react-redux';

class OpenExistingList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.lists}
          renderItem={({ item }) => (
            <Button
              onPress={() => {
                this.props.navigation.navigate('EditExistingList');
              }}
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
    lists: state.lists,
  };
};

export default connect(
  mapStateToProps,
  null,
)(withNavigation(OpenExistingList));

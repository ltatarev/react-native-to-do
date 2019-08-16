import React, { Component } from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import CreateNewList from '../components/CreateNewList'

class CreateNewListView extends Component {
    static navigationOptions = {
        headerTitle: "Create new to do list"
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <CreateNewList/>
            </View>
        )
    }
}

export default connect()(withNavigation(CreateNewListView))
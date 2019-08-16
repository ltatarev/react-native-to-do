import React, { Component } from 'react';
import { View } from 'react-native';

import CreateNewToDo from '../components/CreateNewToDo'

export default class CreateNewTodoView extends Component {
    static navigationOptions = {
        headerTitle: "Create new to do task"
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <CreateNewToDo/>
            </View>
        )
    }
}

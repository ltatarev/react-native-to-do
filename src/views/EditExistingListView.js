import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import EditExistingList from '../components/EditExistingList'

const mapStateToProps = state => ({
    todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch({
        type: TOGGLE_TODO, id
    })
})

class EditExistingView extends Component {
    static navigationOptions = {
        headerTitle: "Edit existing list"
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <EditExistingList/>
            </View>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditExistingView)
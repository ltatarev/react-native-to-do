import React, { Component } from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import Login from '../components/Login'

class LoginView extends Component {
    static navigationOptions = {
        headerTitle: "Login"
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Login/>
            </View>
        )
    }
}

export default connect()(withNavigation(LoginView));
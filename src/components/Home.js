import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
    StyleSheet,
    Button,
    FlatList,
    View,
} from 'react-native';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={[
                        { key: 'Create new list', route: 'CreateNewList'},
                        { key: 'Open existing', route: 'OpenExistingList'},
                        { key: 'Log out', route: 'Login' }
                    ]}
                    renderItem={({ item }) => <Button
                        onPress={() => {
                            this.props.navigation.navigate(item.route)
                        }}
                        title={item.key}
                    />}
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
    }
});

export default connect()(withNavigation(Home));
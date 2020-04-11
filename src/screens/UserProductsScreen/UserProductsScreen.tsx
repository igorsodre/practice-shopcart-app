import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { INavigatorProp, INavigationOptions } from '../../typings';

interface UserProductsRouteParams {
}
interface UserProductsScreenProps extends INavigatorProp<any, UserProductsRouteParams> { }

const UserProductsScreen: React.FC<UserProductsScreenProps> = props => {

    props.navigation.setOptions(screenOptions({}));

    return (
        <View style={styles.container}>
            <Text>UserProducts</Text>
        </View>
    );
};

const screenOptions = (optional: Partial<INavigationOptions> = {}): INavigationOptions => {
    return {
        ...{
            title: 'UserProducts',
        }, ...optional
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
});

export default UserProductsScreen;

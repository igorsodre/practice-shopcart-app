import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { INavigatorProp, INavigationOptions } from '../../typings';

interface OrdersRouteParams {
}
interface OrdersScreenProps extends INavigatorProp<any, OrdersRouteParams> { }

const OrdersScreen: React.FC<OrdersScreenProps> = props => {

    props.navigation.setOptions(screenOptions({}));

    return (
        <View style={styles.container}>
            <Text>Orders</Text>
        </View>
    );
};

const screenOptions = (optional: Partial<INavigationOptions> = {}): INavigationOptions => {
    return {
        ...{
            title: 'Orders',
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

export default OrdersScreen;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { INavigatorProp, INavigationOptions } from '../../typings';

interface CartScreenRouteParams {}
interface CartScreenProps extends INavigatorProp<any, CartScreenRouteParams> {}

const CartScreen: React.FC<CartScreenProps> = (props) => {
	props.navigation.setOptions(screenOptions({}));

	return (
		<View style={styles.container}>
			<Text>CartScreen</Text>
		</View>
	);
};

const screenOptions = (optional: Partial<INavigationOptions> = {}): INavigationOptions => {
	return {
		...{
			title: 'CartScreen',
		},
		...optional,
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
});

export default CartScreen;

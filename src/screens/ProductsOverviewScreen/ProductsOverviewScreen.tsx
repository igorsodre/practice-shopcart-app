import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { INavigatorProp, INavigationOptions } from '../../typings';

interface ProductsOverviewRouteParams {}
interface ProductsOverviewScreenProps extends INavigatorProp<any, ProductsOverviewRouteParams> {}

const ProductsOverviewScreen: React.FC<ProductsOverviewScreenProps> = (props) => {
	props.navigation.setOptions(screenOptions({}));

	return (
		<View style={styles.container}>
			<Text>ProductsOverview</Text>
		</View>
	);
};

const screenOptions = (optional: Partial<INavigationOptions> = {}): INavigationOptions => {
	return {
		...{
			title: 'ProductsOverview',
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

export default ProductsOverviewScreen;

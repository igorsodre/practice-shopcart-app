import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { INavigationOptions, INavigatorProp } from '../../typings';

type EditProductRouteParams = {};
type EditProductScreenProps = INavigatorProp<{}, EditProductRouteParams>;

const EditProductScreen: React.FC<EditProductScreenProps> = (props) => {
	props.navigation.setOptions(screenOptions({}));

	return (
		<View style={styles.container}>
			<Text>EditProduct</Text>
		</View>
	);
};

const screenOptions = (optional: Partial<INavigationOptions> = {}): INavigationOptions => {
	return {
		...{
			title: 'EditProduct',
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

export default EditProductScreen;

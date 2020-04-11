import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { INavigatorProp, INavigationOptions } from '../../typings';
import { useSelector } from 'react-redux';
import { TRootState } from '../../data';

interface ProductDetailRouteParams {
	productId: string;
}
interface ProductDetailScreenProps extends INavigatorProp<any, ProductDetailRouteParams> {}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = (props) => {
	const { productId } = props.route.params;
	const selectedProduct = useSelector((state: TRootState) =>
		state.products.availableProducts.find((p) => p.id === productId),
	)!;
	props.navigation.setOptions(screenOptions({ title: selectedProduct.title }));

	return (
		<View style={styles.container}>
			<Text>{selectedProduct.title}</Text>
		</View>
	);
};

const screenOptions = (optional: Partial<INavigationOptions> = {}): INavigationOptions => {
	return {
		...{
			title: 'ProductDetail',
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

export default ProductDetailScreen;

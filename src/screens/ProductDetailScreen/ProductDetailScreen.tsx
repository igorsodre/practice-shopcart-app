import React from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../constants';
import { TRootState } from '../../data';
import { addToCart } from '../../data/cart/actions';
import { INavigationOptions, INavigatorProp } from '../../typings';

interface ProductDetailRouteParams {
	productId: string;
}
interface ProductDetailScreenProps extends INavigatorProp<any, ProductDetailRouteParams> {}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = (props) => {
	const dispatch = useDispatch();
	const { productId } = props.route.params;
	const selectedProduct = useSelector((state: TRootState) =>
		state.products.availableProducts.find((p) => p.id === productId),
	)!;
	props.navigation.setOptions(
		screenOptions({
			title: selectedProduct.title,
		}),
	);

	return (
		<ScrollView>
			<View style={styles.imgContainer}>
				<Image source={{ uri: selectedProduct.imageUrl }} style={{ width: '100%', height: '100%' }} />
			</View>
			<View style={styles.buttonContainer}>
				<Button
					color={Colors.primary}
					onPress={() => {
						dispatch(addToCart(selectedProduct));
					}}
					title="Add to Cart"
				/>
			</View>
			<Text style={styles.textPrice}>${selectedProduct.price.toFixed(2)}</Text>
			<Text style={styles.textDescription}>{selectedProduct.description}</Text>
		</ScrollView>
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
	imgContainer: {
		height: 300,
		width: '100%',
	},
	buttonContainer: {
		marginVertical: 10,
		// width: '50%',
		alignItems: 'center',
		// alignSelf: 'center',
	},
	textPrice: {
		fontSize: 20,
		color: '#888',
		textAlign: 'center',
		marginVertical: 20,
	},
	textDescription: {
		marginHorizontal: 20,
		fontSize: 14,
		textAlign: 'center',
	},
});

export default ProductDetailScreen;

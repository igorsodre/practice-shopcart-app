import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/ProductItem';
import ShopcartButton from '../../components/ShopcartButton';
import { Colors } from '../../constants';
import { TRootState } from '../../data';
import { addToCart } from '../../data/cart/actions';
import { fetchProducts } from '../../data/products/actions';
import { INavigationOptions, INavigatorProp } from '../../typings';

type ProductsOverviewRouteParams = {};
type ProductsOverviewScreenProps = INavigatorProp<{}, ProductsOverviewRouteParams>;

const ProductsOverviewScreen: React.FC<ProductsOverviewScreenProps> = (props) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const loadProducts = () => {
		setIsLoading(true);
		dispatch(fetchProducts()).then(() => {
			setIsLoading(false);
		});
	};

	useEffect(() => {
		loadProducts();
		const unsubscribeEvent = props.navigation.addListener('focus', loadProducts);
		return () => {
			unsubscribeEvent();
		};
	}, []);

	props.navigation?.setOptions(
		screenOptions({
			headerRight: () => (
				<ShopcartButton
					iconName="md-cart"
					onPress={() => {
						props.navigation.navigate('Cart');
					}}
				/>
			),
			headerLeft: () => <ShopcartButton iconName="md-menu" onPress={() => props.navigation.toggleDrawer()} />,
		}),
	);

	const products = useSelector((state: TRootState) => state.products.availableProducts);

	if (isLoading)
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);

	if (products.length === 0)
		return (
			<View style={styles.centered}>
				<Text> No products found.</Text>
			</View>
		);

	return (
		//<View style={styles.container}>
		<FlatList
			onRefresh={loadProducts}
			refreshing={isLoading}
			data={products}
			renderItem={(itemData) => (
				<ProductItem
					product={itemData.item}
					onAddToCart={() => {
						dispatch(addToCart(itemData.item));
					}}
					onSelect={() => {
						props.navigation.navigate('ProductDetail', { productId: itemData.item.id });
					}}
				/>
			)}
			style={{ width: '100%' }}
		/>
		//</View>
	);
};

const screenOptions = (optional: Partial<INavigationOptions> = {}): INavigationOptions => {
	return {
		...{
			title: 'ProductsOverviews',
		},
		...optional,
	};
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
});

export default ProductsOverviewScreen;

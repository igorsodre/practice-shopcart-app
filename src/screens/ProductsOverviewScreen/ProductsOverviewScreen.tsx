import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/ProductItem';
import ShopcartButton from '../../components/ShopcartButton';
import { TRootState } from '../../data';
import { addToCart } from '../../data/cart/actions';
import { INavigationOptions, INavigatorProp } from '../../typings';

type ProductsOverviewRouteParams = {};
type ProductsOverviewScreenProps = INavigatorProp<{}, ProductsOverviewRouteParams>;

const ProductsOverviewScreen: React.FC<ProductsOverviewScreenProps> = (props) => {
	const dispatch = useDispatch();
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
	return (
		<View style={styles.container}>
			<FlatList
				data={products}
				renderItem={(itemData) => (
					<ProductItem
						product={itemData.item}
						onAddToCart={() => {
							dispatch(addToCart(itemData.item));
						}}
						onViewDetail={() => {
							props.navigation.navigate('ProductDetail', { productId: itemData.item.id });
						}}
					/>
				)}
				style={{ width: '100%' }}
			/>
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

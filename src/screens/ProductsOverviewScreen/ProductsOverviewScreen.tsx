import React from 'react';
import { StyleSheet, Text, View, ListRenderItemInfo } from 'react-native';
import { INavigatorProp, INavigationOptions, TNavigationController } from '../../typings';
import { useSelector } from 'react-redux';
import { TRootState } from '../../data';
import { FlatList } from 'react-native-gesture-handler';
import { Product } from '../../models/product';
import ProductItem from '../../components/ProductItem';

interface ProductsOverviewRouteParams {}
interface ProductsOverviewScreenProps extends INavigatorProp<any, ProductsOverviewRouteParams> {}

const rednderProduct = (navigation: TNavigationController<any>, itemData: ListRenderItemInfo<Product>) => {
	return (
		<ProductItem
			product={itemData.item}
			onAddToCart={() => {}}
			onViewDetail={() => {
				navigation.navigate('ProductDetail', { productId: itemData.item.id });
			}}
		/>
	);
};
const ProductsOverviewScreen: React.FC<ProductsOverviewScreenProps> = (props) => {
	props.navigation?.setOptions(screenOptions({}));
	const products = useSelector((state: TRootState) => state.products.availableProducts);
	return (
		<View style={styles.container}>
			<FlatList
				data={products}
				renderItem={rednderProduct.bind(null, props.navigation)}
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

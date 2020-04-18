import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/ProductItem';
import ShopcartButton from '../../components/ShopcartButton';
import { Colors } from '../../constants';
import { TRootState } from '../../data';
import { deleteProduct } from '../../data/products/actions';
import { Product } from '../../models/product';
import { INavigationOptions, INavigatorProp } from '../../typings';

type UserProductsRouteParams = {};
type UserProductsScreenProps = INavigatorProp<{}, UserProductsRouteParams>;

const UserProductsScreen: React.FC<UserProductsScreenProps> = (props) => {
	props.navigation.setOptions(
		screenOptions({
			headerLeft: () => <ShopcartButton iconName="md-menu" onPress={() => props.navigation.toggleDrawer()} />,
			headerRight: () => (
				<ShopcartButton iconName="md-create" onPress={() => props.navigation.navigate('EditProduct', {})} />
			),
		}),
	);
	const userProducts = useSelector((state: TRootState) => state.products.userProducts);
	const dispatch = useDispatch();
	const selectProductHandler = (product: Product) => {
		props.navigation.navigate('EditProduct', { product });
	};
	return (
		<FlatList
			style={styles.container}
			data={userProducts}
			renderItem={(itemData) => {
				return (
					<ProductItem
						product={itemData.item}
						onAddToCart={() => null}
						onSelect={() => selectProductHandler(itemData.item)}>
						<Button
							color={Colors.primary}
							onPress={() => selectProductHandler(itemData.item)}
							title="Edit"
						/>
						<Button
							color={Colors.primary}
							onPress={() => {
								dispatch(deleteProduct(itemData.item.id));
							}}
							title="Delete"
						/>
					</ProductItem>
				);
			}}
		/>
	);
};

const screenOptions = (optional: Partial<INavigationOptions> = {}): INavigationOptions => {
	return {
		...{
			title: 'Your Products',
		},
		...optional,
	};
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
});

export default UserProductsScreen;

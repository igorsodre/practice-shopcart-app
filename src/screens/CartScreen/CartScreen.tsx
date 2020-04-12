import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Colors } from '../../constants';
import { TRootState } from '../../data';
import { INavigationOptions, INavigatorProp } from '../../typings';
import CartListItem from './CartListItem';

interface CartScreenRouteParams {}
interface CartScreenProps extends INavigatorProp<any, CartScreenRouteParams> {}

const CartScreen: React.FC<CartScreenProps> = (props) => {
	props.navigation.setOptions(screenOptions({}));
	const { items, totalAmount } = useSelector((state: TRootState) => state.cart);
    const itemList = Object.keys(items).map((k) => ({ id: k, cart: items[k]! }));
	return (
		<View style={styles.container}>
			<View style={styles.summary}>
				<Text style={styles.summaryText}>
					Total: <Text style={styles.amountText}>${totalAmount.toFixed(2)}</Text>
				</Text>
				<Button color={Colors.accent} title="Order Now" onPress={() => {}} disabled={itemList.length === 0} />
			</View>
			<FlatList
				style={{ width: '100%' }}
				data={itemList}
				renderItem={(itemData) => (<CartListItem cartItem={itemData.item.cart} onRemove={() => {}} />)}
			/>
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
		//justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		width: '100%',
	},
	summary: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
		elevation: 5,
		backgroundColor: 'white',
		borderRadius: 10,
		minHeight: 60,
		paddingHorizontal: 15,
		width: '100%',
	},
	summaryText: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	amountText: {
		color: Colors.primary,
	},
});

export default CartScreen;

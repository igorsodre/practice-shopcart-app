import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShopcartButton from '../../components/ShopcartButton';
import { CartItem } from '../../models/cart-item';

interface CartListitemProps {
	onRemove: () => void;
	cartItem: CartItem;
}
const CartListItem: React.FC<CartListitemProps> = (props) => {
	const cart = props.cartItem;
	return (
		<View style={styles.container}>
			<View style={styles.itemText}>
				<Text style={styles.qtyText}> {cart.quantity.toString().padStart(2, '0')} - </Text>
				<Text style={styles.mainText}>{cart.price.toFixed(2)}</Text>
			</View>

			<View style={styles.actionContainer}>
				<Text style={styles.mainText}>{cart.sum.toFixed(2)}</Text>
				<ShopcartButton
					iconName="md-trash"
					color="red"
					onPress={() => {
						props.onRemove();
					}}
					style={{ marginLeft: 20 }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between',
		minHeight: 60,
		alignItems: 'center',
	},
	itemText: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	qtyText: {
		color: '#888',
		fontSize: 16,
	},
	mainText: {
		fontWeight: 'bold',
		fontSize: 17,
	},
	actionContainer: {
		flexDirection: 'row',
	},
});

export default CartListItem;

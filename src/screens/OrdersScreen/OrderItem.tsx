import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants';
import { getReadableDate, Order } from '../../models/order';
import CartListItem from '../CartScreen/CartListItem';

type OrderItemProps = {
	order: Order;
};
const OrderItem: React.FC<OrderItemProps> = (props) => {
	const [showDetails, setShowDetails] = useState(false);
	const { order } = props;
	const items = Object.keys(order.items).map((k) => order.items[k]!);
	return (
		<View style={styles.container}>
			<View style={styles.orderDetailTextContainer}>
				<Text style={styles.orderAmountText}>{order.totalAmount.toFixed(2)}</Text>
				<Text style={styles.orderDateText}>{getReadableDate(order)}</Text>
			</View>
			<Button
				color={Colors.primary}
				title="Toggle Details"
				onPress={() => {
					setShowDetails((prev) => !prev);
				}}
			/>
			{showDetails && (
				<View>
					{items.map((el) => (
						<CartListItem hideButton cartItem={el} key={el.title} onRemove={() => null} />
					))}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		elevation: 5,
		borderRadius: 10,
		backgroundColor: 'white',
		overflow: 'hidden',
		padding: 10,
		width: '95%',
		alignSelf: 'center',
		marginTop: 10,
	},
	orderDetailTextContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		marginBottom: 15,
	},
	orderAmountText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	orderDateText: {
		fontSize: 16,
		color: '#888',
	},
});

export default OrderItem;

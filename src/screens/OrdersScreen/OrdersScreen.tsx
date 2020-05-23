import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import ShopcartButton from '../../components/ShopcartButton';
import { Colors } from '../../constants';
import { TRootState, AppDispatcher } from '../../data';
import { fetchOrders } from '../../data/orders/actions';
import { INavigationOptions, INavigatorProp } from '../../typings';
import OrderItem from './OrderItem';

type OrdersRouteParams = {};
type OrdersScreenProps = INavigatorProp<{}, OrdersRouteParams>;

const OrdersScreen: React.FC<OrdersScreenProps> = (props) => {
	const orders = useSelector((state: TRootState) => state.orders.orders);
	const dispatch: AppDispatcher = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	props.navigation.setOptions(
		screenOptions({
			headerLeft: () => <ShopcartButton iconName="md-menu" onPress={() => props.navigation.toggleDrawer()} />,
		}),
	);
	const loadOrders = () => {
		setIsLoading(true);
		dispatch(fetchOrders()).then(() => {
			setIsLoading(false);
		});
	};

	useEffect(() => {
		loadOrders();
		const unsubscribeEvent = props.navigation.addListener('focus', loadOrders);
		return () => {
			unsubscribeEvent();
		};
	}, []);

	if (isLoading)
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	if (orders.length === 0)
		return (
			<View style={styles.centered}>
				<Text> No orders found.</Text>
			</View>
		);
	return (
		<View style={styles.container}>
			<FlatList
				onRefresh={loadOrders}
				style={{ width: '100%' }}
				data={orders}
				renderItem={(itemData) => <OrderItem order={itemData.item} />}
			/>
		</View>
	);
};

const screenOptions = (optional: Partial<INavigationOptions> = {}): INavigationOptions => {
	return {
		...{
			title: 'Your Orders',
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

export default OrdersScreen;

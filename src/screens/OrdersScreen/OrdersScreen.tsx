import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ShopcartButton from '../../components/ShopcartButton';
import { TRootState } from '../../data';
import { INavigationOptions, INavigatorProp } from '../../typings';

interface OrdersRouteParams {}
interface OrdersScreenProps extends INavigatorProp<any, OrdersRouteParams> {}

const OrdersScreen: React.FC<OrdersScreenProps> = (props) => {
	const orders = useSelector((state: TRootState) => state.orders.orders);
	props.navigation.setOptions(
		screenOptions({
			headerLeft: () => <ShopcartButton iconName="md-menu" onPress={() => props.navigation.toggleDrawer()} />,
		}),
	);
	return (
		<View style={styles.container}>
			<FlatList data={orders} renderItem={(itemData) => <Text>{itemData.item.totalAmount.toFixed(2)}</Text>} />
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
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
});

export default OrdersScreen;

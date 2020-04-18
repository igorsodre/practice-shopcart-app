import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ShopcartButton from '../../components/ShopcartButton';
import { TRootState } from '../../data';
import { INavigationOptions, INavigatorProp } from '../../typings';
import OrderItem from './OrderItem';

type OrdersRouteParams = {};
type OrdersScreenProps = INavigatorProp<{}, OrdersRouteParams>;

const OrdersScreen: React.FC<OrdersScreenProps> = (props) => {
	const orders = useSelector((state: TRootState) => state.orders.orders);
	props.navigation.setOptions(
		screenOptions({
			headerLeft: () => <ShopcartButton iconName="md-menu" onPress={() => props.navigation.toggleDrawer()} />,
		}),
	);
	return (
		<View style={styles.container}>
			<FlatList
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
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
});

export default OrdersScreen;

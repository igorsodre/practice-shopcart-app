import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import ShopcartButton from '../components/ShopcartButton';
import { Colors } from '../constants';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductsOverviewScreen from '../screens/ProductsOverviewScreen';

const defaultNavigationOptions: StackNavigationOptions = {
	headerStyle: {
		backgroundColor: Colors.primary,
	},
	headerTintColor: 'white',
};
const Stack = createStackNavigator();
const ShopcartBrowseStackNavigator = () => (
	<Stack.Navigator screenOptions={defaultNavigationOptions}>
		<Stack.Screen name="ProductOverview" component={ProductsOverviewScreen} />
		<Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
		<Stack.Screen name="Cart" component={CartScreen} />
	</Stack.Navigator>
);

const ShopcartOrdersStackNavigator = () => (
	<Stack.Navigator screenOptions={defaultNavigationOptions}>
		<Stack.Screen name="Orders" component={OrdersScreen} />
	</Stack.Navigator>
);

const Drawer = createDrawerNavigator();
const ShopcartDrawerNavigator = () => (
	<Drawer.Navigator drawerType="front">
		<Drawer.Screen
			name="Shop"
			component={ShopcartBrowseStackNavigator}
			options={{
				drawerIcon: (props) => (
					<ShopcartButton iconName="md-list" color={props.focused ? Colors.primary : props.color} />
				),
			}}
		/>
		<Drawer.Screen
			name="Orders"
			component={ShopcartOrdersStackNavigator}
			options={{
				drawerIcon: (props) => (
					<ShopcartButton iconName="md-create" color={props.focused ? Colors.primary : props.color} />
				),
			}}
		/>
	</Drawer.Navigator>
);

export default () => (
	<NavigationContainer>
		<ShopcartDrawerNavigator />
	</NavigationContainer>
);

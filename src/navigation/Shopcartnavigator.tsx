import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { Colors } from '../constants';
import ProductsOverviewScreen from '../screens/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const defaultNavigationOptions: StackNavigationOptions = {
	headerStyle: {
		backgroundColor: Colors.primary,
	},
	headerTintColor: 'white',
};
const Stack = createStackNavigator();
const ShopcartStackNavigator = () => (
	<Stack.Navigator screenOptions={defaultNavigationOptions}>
		<Stack.Screen name="ProductOverview" component={ProductsOverviewScreen} />
		<Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
	</Stack.Navigator>
);

export default () => (
	<NavigationContainer>
		<ShopcartStackNavigator />
	</NavigationContainer>
);

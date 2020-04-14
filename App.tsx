import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { shopcartReducers } from './src/data';
import ShopcartNavigator from './src/navigation/Shopcartnavigator';

enableScreens();

const store = createStore(shopcartReducers);

export default function App() {
	return (
		<Provider store={store}>
			<ShopcartNavigator />
		</Provider>
	);
}

import firebase from 'firebase';
import React from 'react';
import { YellowBox } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { store } from './src/data';
import credentials from './src/data/rpgmanager-ea5c9-firebase-adminsdk-r9hv5-714ff7de0d';
import ShopcartNavigator from './src/navigation/Shopcartnavigator';

enableScreens();

YellowBox.ignoreWarnings(['Setting a timer']);

export default function App() {
	if (!firebase.apps.length) {
		try {
			firebase.initializeApp(credentials);
		} catch (err) {
			console.log(err.message);
		}
	}

	return (
		<Provider store={store}>
			<ShopcartNavigator />
		</Provider>
	);
}

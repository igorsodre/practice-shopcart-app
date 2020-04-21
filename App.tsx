import firebase from 'firebase';
import React from 'react';
import { YellowBox } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { shopcartReducers } from './src/data';
import credentials from './src/data/rpgmanager-ea5c9-firebase-adminsdk-r9hv5-714ff7de0d.json';
import ShopcartNavigator from './src/navigation/Shopcartnavigator';

enableScreens();

const store = createStore(shopcartReducers, applyMiddleware(ReduxThunk));
YellowBox.ignoreWarnings(['Setting a timer']);

export default function App() {
	if (!firebase.apps.length) firebase.initializeApp(credentials);

	return (
		<Provider store={store}>
			<ShopcartNavigator />
		</Provider>
	);
}

import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors } from '../../constants';
import { login, SignUp } from '../../data/auth/actions';
import { INavigationOptions, INavigatorProp } from '../../typings';
import { AppDispatcher } from '../../data';

type AuthScreenRouteParams = {};
type AuthScreenScreenProps = INavigatorProp<{}, AuthScreenRouteParams>;
const AuthScreenScreen: React.FC<AuthScreenScreenProps> = (props) => {
	props.navigation.setOptions(screenOptions({}));
	const dispatch: AppDispatcher = useDispatch();
	const [email, setEmail] = useState('teste@email.com');
	const [password, setPassword] = useState('pass123');
	const [isSignUp, setIsSignUp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const authHandler = async () => {
		setIsLoading(true);
		if (isSignUp) await dispatch(SignUp(email, password));
		else await dispatch(login(email, password));
		setIsLoading(false);
		props.navigation.replace('Main', {});
	};

	const getToggleSignUpButtonText = (): string => {
		return !isSignUp ? 'Switch to Sign Up' : 'Switch to Login';
	};

	const getSignUpButtonText = (): string => {
		return isSignUp ? 'Sign Up' : 'Login';
	};

	// const updateState = (newState: Partial<EditProductScreenState>): void => {
	// 	setState((old) => ({ ...old, ...newState }));
	// };

	return (
		<View style={styles.container}>
			<LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.container}>
				<View style={styles.form}>
					<View style={styles.formControll}>
						<Text style={styles.labelStyle}>E-Mail</Text>
						<TextInput
							style={styles.inputStyle}
							value={email}
							keyboardType="email-address"
							onChangeText={(text) => setEmail(text)}
							autoCapitalize="none"
							placeholder="example@email.com"
						/>
					</View>
					<View style={styles.formControll}>
						<Text style={styles.labelStyle}>Password</Text>
						<TextInput
							style={styles.inputStyle}
							value={password}
							keyboardType="email-address"
							onChangeText={(text) => setPassword(text)}
							autoCapitalize="none"
							secureTextEntry
						/>
					</View>
					<View style={styles.buttonContainer}>
						{isLoading ? (
							<ActivityIndicator color={Colors.primary} size="small" />
						) : (
							<Button title={getSignUpButtonText()} color={Colors.primary} onPress={authHandler} />
						)}
						<Button
							title={getToggleSignUpButtonText()}
							color={Colors.accent}
							onPress={() => setIsSignUp(!isSignUp)}
						/>
					</View>
				</View>
			</LinearGradient>
		</View>
	);
};

const screenOptions = (optional: Partial<INavigationOptions> = {}): INavigationOptions => {
	return {
		...{
			title: 'Authentication Required',
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
		height: '100%',
	},
	form: {
		flex: 1,
		alignItems: 'center',
		padding: 20,
		width: '90%',
		borderRadius: 25,
		maxHeight: 300,
		backgroundColor: 'white',
	},
	formControll: {
		width: '100%',
	},
	labelStyle: {
		fontWeight: 'bold',
		marginVertical: 8,
	},
	inputStyle: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
	buttonContainer: {
		marginTop: 20,
		width: '100%',
		minHeight: 80,
		justifyContent: 'space-between',
	},
});

export default AuthScreenScreen;

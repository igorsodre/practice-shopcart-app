import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ShopcartButton from '../../components/ShopcartButton';
import { Product } from '../../models/product';
import { INavigationOptions, INavigatorProp } from '../../typings';
import { useDispatch } from 'react-redux';
import { updateProduct, createProduct } from '../../data/products/actions';
import { isURL } from '../../constants';

type EditProductScreenState = {
	title: string;
	imageUrl: string;
	price: string;
	description: string;
};

const initProduct = (product?: Product): EditProductScreenState => {
	const p = product || new Product(new Date().toString(), 'n1', '', '', '', 0);
	const price = product ? product.price.toString() : '';
	return { description: p.description, imageUrl: p.imageUrl, price, title: p.title };
};

type EditProductRouteParams = {
	product?: Product;
};
type EditProductScreenProps = INavigatorProp<{}, EditProductRouteParams>;

const EditProductScreen: React.FC<EditProductScreenProps> = (props) => {
	const { product } = props.route.params;
	const headerTitle = product ? 'Edit Product' : 'Add Product';

	const dispatch = useDispatch();
	const [state, setState] = useState<EditProductScreenState>(initProduct(product));
	const updateState = (newState: Partial<EditProductScreenState>): void => {
		setState((old) => ({ ...old, ...newState }));
	};

	const validateForm = (): boolean => {
		let result = true;
		result = result && state.title.length > 0;
		result = result && Number(state.price) > 0;
		result = result && isURL(state.imageUrl);
		return result;
	};

	const submitHandler = () => {
		if (!validateForm()) {
			Alert.alert('Error', 'Invalid Form Data');
			return;
		}
		const { title, description, imageUrl, price } = state;
		if (product) {
			dispatch(updateProduct(product.id, title, description, imageUrl));
		} else {
			dispatch(createProduct(title, description, imageUrl, price));
		}
		props.navigation.pop();
	};

	props.navigation.setOptions(
		screenOptions({
			title: headerTitle,
			headerRight: () => <ShopcartButton iconName="md-checkmark" onPress={submitHandler} />,
		}),
	);

	const priceInputHandler = (text: string) => {
		updateState({ price: text.match(/\d|\./g)?.join('') || '' });
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={150}>
			<ScrollView
				contentContainerStyle={styles.scrollable}
				keyboardShouldPersistTaps="handled"
				removeClippedSubviews={false}>
				<View style={styles.form}>
					<View style={styles.formControll}>
						<Text style={styles.labelStyle}>Title</Text>
						<TextInput
							style={styles.inputStyle}
							value={state.title}
							onChangeText={(text) => {
								updateState({ title: text });
							}}
							autoCapitalize="sentences"
							autoCorrect
							returnKeyType="next"
						/>
					</View>
					<View style={styles.formControll}>
						<Text style={styles.labelStyle}>Image URL</Text>
						<TextInput
							style={styles.inputStyle}
							value={state.imageUrl}
							onChangeText={(text) => updateState({ imageUrl: text })}
						/>
					</View>
					{product ? null : (
						<View style={styles.formControll}>
							<Text style={styles.labelStyle}>Price</Text>
							<TextInput
								style={styles.inputStyle}
								value={state.price}
								onChangeText={priceInputHandler}
								keyboardType="decimal-pad"
							/>
						</View>
					)}
					<View style={styles.formControll}>
						<Text style={styles.labelStyle}>Description</Text>
						<TextInput
							style={styles.inputStyle}
							value={state.description}
							onChangeText={(text) => updateState({ description: text })}
							autoCapitalize="sentences"
							multiline
							autoCorrect
							numberOfLines={3}
						/>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const screenOptions = (optional: Partial<INavigationOptions> = {}): INavigationOptions => {
	return {
		...{
			title: 'EditProduct',
		},
		...optional,
	};
};

const styles = StyleSheet.create({
	scrollable: {
		width: '100%',
	},
	form: {
		flex: 1,
		alignItems: 'center',
		margin: 20,
		width: '95%',
		alignSelf: 'center',
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
});

export default EditProductScreen;

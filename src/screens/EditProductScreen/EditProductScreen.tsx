import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ShopcartButton from '../../components/ShopcartButton';
import { Product } from '../../models/product';
import { INavigationOptions, INavigatorProp } from '../../typings';
import { useDispatch } from 'react-redux';
import { updateProduct, createProduct } from '../../data/products/actions';

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

	const submitHandler = () => {
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

	return (
		<ScrollView
			contentContainerStyle={styles.scrollable}
			keyboardShouldPersistTaps="handled"
			removeClippedSubviews={false}>
			<KeyboardAvoidingView style={styles.scrollable}>
				<View style={styles.form}>
					<View style={styles.formControll}>
						<Text style={styles.labelStyle}>Title</Text>
						<TextInput
							style={styles.inputStyle}
							value={state.title}
							onChangeText={(text) => updateState({ title: text })}
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
								onChangeText={(text) => updateState({ price: text })}
							/>
						</View>
					)}
					<View style={styles.formControll}>
						<Text style={styles.labelStyle}>Description</Text>
						<TextInput
							style={styles.inputStyle}
							value={state.description}
							onChangeText={(text) => updateState({ description: text })}
						/>
					</View>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
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
		height: '100%',
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

import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants';
import { Product } from '../models/product';

interface ProductItemProps {
	product: Product;
	onSelect?: () => void;
	onAddToCart?: () => void;
}
const ProductItem: React.FC<ProductItemProps> = (props) => {
	const { product } = props;
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={() => props.onSelect?.call(null)}>
			<View style={styles.container}>
				<View style={styles.imgContainer}>
					<Image source={{ uri: product.imageUrl }} style={{ height: '100%', width: '100%' }} />
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.titleTextStyle}>{product.title}</Text>
					<Text style={styles.priceTextStyle}>${product.price.toFixed(2)}</Text>
				</View>
				<View style={styles.buttonsContainer}>
					{!props.children && (
						<Button
							color={Colors.primary}
							onPress={() => props.onSelect?.call(null)}
							title="View Details"
						/>
					)}
					{!props.children && (
						<Button color={Colors.primary} onPress={() => props.onAddToCart?.call(null)} title="To Cart" />
					)}
					{props.children}
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		shadowColor: 'black',
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: 'white',
		minHeight: 300,
		width: '90%',
		margin: 20,
		overflow: 'hidden',
	},
	imgContainer: {
		maxHeight: '60%',
		width: '100%',
		overflow: 'hidden',
	},
	textContainer: {
		height: '15%',
		padding: 10,
	},
	titleTextStyle: {
		fontSize: 18,
		marginVertical: 4,
		textAlign: 'center',
	},
	priceTextStyle: {
		fontSize: 14,
		color: '#888',
		textAlign: 'center',
	},
	buttonsContainer: {
		flexDirection: 'row',
		height: '25%',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
});

export default ProductItem;

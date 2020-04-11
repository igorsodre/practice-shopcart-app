import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
	HeaderButton as HButton,
	HeaderButtonProps as HBProps,
	HeaderButtons,
	Item,
} from 'react-navigation-header-buttons';
// import Colors from '../constants/Colors';
const Colors = {
	primaryColor: 'red',
};

interface HeaderButtonProps extends HBProps {
	color?: string;
	iconSize?: number;
}
const HeaderButton: React.FC<HeaderButtonProps> = (props) => {
	const color =
		props.color ||
		(Platform.OS === 'android' ? 'white' : Colors.primaryColor);
	return (
		<HButton
			{...props}
			IconComponent={Ionicons}
			iconSize={props.iconSize || 23}
			color={color}
		/>
	);
};

interface ShopcartbuttonProps {
	title?: string;
	onPress?: () => void;
	iconName: string;
	color?: string;
	iconSize?: number;
}
const ShopcartButton: React.FC<ShopcartbuttonProps> = (props) => {
	return (
		<HeaderButtons HeaderButtonComponent={HeaderButton}>
			<Item
				color={props.color}
				title={props.title || Math.random().toString()}
				iconName={props.iconName}
				onPress={props.onPress}
				iconSize={props.iconSize}
			/>
		</HeaderButtons>
	);
};

export default ShopcartButton;

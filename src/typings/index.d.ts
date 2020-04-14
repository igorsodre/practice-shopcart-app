import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';

export type TNavigationController<T> = StackNavigationProp<Record<string, T>> & DrawerNavigationProp<Record<string, T>>;
export type TRouteController<U> = { key: string; name: string; params: U };
export interface INavigatorProp<T = {}, U = {}> {
	navigation: TNavigationController<T>;
	route: TRouteController<U>;
}

export type INavigationOptions = StackNavigationOptions;

export default {
	INavigatorProp,
	INavigationOptions,
};

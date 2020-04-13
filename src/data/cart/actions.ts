import { Product } from '../../models/product';
import { IAddOrderAction } from '../orders/actions';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export interface IAddToCartAction {
	type: typeof ADD_TO_CART;
	product: Product;
}

export interface IRemoveFromCartAction {
	type: typeof REMOVE_FROM_CART;
	productId: string;
}

export type CartActionType = IAddToCartAction | IRemoveFromCartAction | IAddOrderAction;

export const addToCart = (product: Product): CartActionType => {
	return { type: ADD_TO_CART, product };
};

export const removeFromCart = (productId: string): CartActionType => {
	return { type: REMOVE_FROM_CART, productId: productId };
};

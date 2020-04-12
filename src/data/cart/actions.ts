import { Product } from '../../models/product';

export const ADD_TO_CART = 'ADD_TO_CART';

interface IAddToCartAction {
	type: typeof ADD_TO_CART;
	product: Product;
}

export type CartActionType = IAddToCartAction;

export const addToCart = (product: Product): CartActionType => {
	return { type: ADD_TO_CART, product };
};

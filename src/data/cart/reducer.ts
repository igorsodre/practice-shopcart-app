import R from 'ramda';
import { TReducerFunction } from '..';
import { CartItem, decrementCartItem, icrementCartItem } from '../../models/cart-item';
import { ADD_ORDER_ACTION } from '../orders/actions';
import { ADD_TO_CART, CartActionType, IAddToCartAction, IRemoveFromCartAction, REMOVE_FROM_CART } from './actions';

export type ICartItemHolder = {
	[key in string]?: CartItem;
};

export interface ICartState {
	items: ICartItemHolder;
	totalAmount: number;
}

const initialState: ICartState = {
	items: {},
	totalAmount: 0,
};

export type CartReducer = TReducerFunction<ICartState, CartActionType>;

const addToCart: CartReducer = (state, action) => {
	const newState = R.clone(state);
	const addedProduct = (action as IAddToCartAction).product;
	const { price: addedPrice, title } = addedProduct;

	if (newState.items[addedProduct.id]) {
		newState.items[addedProduct.id] = icrementCartItem(newState.items[addedProduct.id]!);
	} else {
		const cartItem = new CartItem(1, addedPrice, title, addedPrice);
		newState.items[addedProduct.id] = cartItem;
	}
	newState.totalAmount += addedPrice;
	return newState;
};

const removeFromCart: CartReducer = (state, action) => {
	const newState = R.clone(state);
	const id = (action as IRemoveFromCartAction).productId;
	if (newState.items[id]) {
		const removedPrice = newState.items[id]!.price;
		if (newState.items[id]!.quantity > 1) {
			newState.items[id] = decrementCartItem(newState.items[id]!);
		} else {
			delete newState.items[id];
		}
		newState.totalAmount -= removedPrice;
	}
	return newState;
};

const clearOrder = (): ICartState => {
	return R.clone(initialState);
};

const cartReducer = (state: ICartState = initialState, action: CartActionType): ICartState => {
	try {
		switch (action.type) {
			case ADD_TO_CART:
				return addToCart(state, action);
			case REMOVE_FROM_CART:
				return removeFromCart(state, action);
			case ADD_ORDER_ACTION:
				return clearOrder();
			default:
				return state;
		}
	} catch (err) {
		return state;
	}
};
export default cartReducer;

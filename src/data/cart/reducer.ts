import { CartActionType, ADD_TO_CART } from './actions';
import { CartItem } from '../../models/cart-item';

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

const cartReducer = (state: ICartState = initialState, action: CartActionType): ICartState => {
	try {
		switch (action.type) {
			case ADD_TO_CART:
				const addedProduct = action.product;
				const { price, title } = addedProduct;
				const newState = { ...state };
				if (newState.items[addedProduct.id]) {
					newState.items[addedProduct.id]?.icrementItem();
				} else {
					const cartItem = new CartItem(1, price, title, price);
					newState.items[addedProduct.id] = cartItem;
				}
				newState.totalAmount += price;
				return newState;
			default:
				return state;
		}
	} catch (err) {
		return state;
	}
};
export default cartReducer;

import { ICartItemHolder } from '../cart/reducer';
export const ADD_ORDER_ACTION = 'ADD_ORDER_ACTION';
export interface IAddOrderAction {
	type: typeof ADD_ORDER_ACTION;
	payload: { items: ICartItemHolder; amout: number };
}
export type OrderActionType = IAddOrderAction;

export const addOrder = (cartItems: ICartItemHolder, totalAmount: number): OrderActionType => {
	return { type: ADD_ORDER_ACTION, payload: { items: { ...cartItems }, amout: totalAmount } };
};
import R from 'ramda';
import { TReducerFunction } from '..';
import { Order } from '../../models/order';
import { ADD_ORDER_ACTION, IAddOrderAction, OrderActionType } from './actions';

export interface IOrderState {
	orders: Order[];
}
const initialState: IOrderState = {
	orders: [],
};

export type OrderReducer = TReducerFunction<IOrderState, OrderActionType>;

const addOrder: OrderReducer = (state, action) => {
	const newState = R.clone(state);
	const { amout: amount, items } = (action as IAddOrderAction).payload;
	const newOrder = new Order(new Date().toString(), items, amount, new Date());
	newState.orders.push(newOrder);
	return newState;
};

const ordersReducer = (state: IOrderState = initialState, action: OrderActionType): IOrderState => {
	switch (action.type) {
		case ADD_ORDER_ACTION:
			return addOrder(state, action);
		default:
			return state;
	}
};

export default ordersReducer;

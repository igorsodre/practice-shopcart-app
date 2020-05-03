import R from 'ramda';
import { TReducerFunction } from '..';
import { Order } from '../../models/order';
import {
	ADD_ORDER_ACTION,
	FETCH_ORDERS_ACTION,
	IAddOrderAction,
	OrderActionType,
	IFetchOrderssAction,
} from './actions';

export interface IOrderState {
	orders: Order[];
}
const initialState: IOrderState = {
	orders: [],
};

export type OrderReducer = TReducerFunction<IOrderState, OrderActionType>;

const addOrder: OrderReducer = (state, action) => {
	const newState = R.clone(state);
	const { amout: amount, items, id, date } = (action as IAddOrderAction).payload;
	const newOrder = new Order(id!, items, amount, date!);
	newState.orders.push(newOrder);
	return newState;
};

const fetchOrders: OrderReducer = (state, action) => {
	const newState = R.clone(state);
	newState.orders = (action as IFetchOrderssAction).payload.map(
		(el) => new Order(el.id!, el.items, el.amout, el.date!),
	);
	return newState;
};

const ordersReducer = (state: IOrderState = initialState, action: OrderActionType): IOrderState => {
	switch (action.type) {
		case ADD_ORDER_ACTION:
			return addOrder(state, action);
		case FETCH_ORDERS_ACTION:
			return fetchOrders(state, action);
		default:
			return state;
	}
};

export default ordersReducer;

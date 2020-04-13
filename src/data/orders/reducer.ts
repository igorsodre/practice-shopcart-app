import { OrderActionType, ADD_ORDER_ACTION, IAddOrderAction } from './actions';
import { Order } from '../../models/order';
import { TReducerFunction } from '..';

export interface IOrderState {
	orders: Order[];
}
const initialState: IOrderState = {
	orders: [],
};

export type OrderReducer = TReducerFunction<IOrderState, OrderActionType>;

const addOrder: OrderReducer = (state, action) => {
	const newState = { ...state };
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

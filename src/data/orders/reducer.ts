import { OrderActionType, ADD_ORDER_ACTION, AddOrderAction } from './actions';
import { Order } from '../../models/order';
import { TReducerFunction } from '..';

export interface IOrderState {
	orders: Order[];
}
const initialState: IOrderState = {
	orders: [],
};

type OrderReducer = TReducerFunction<IOrderState, OrderActionType>;

const addOrder: OrderReducer = (state, action) => {
	const newState = { ...state };
	const { amout: amount, items } = (action as AddOrderAction).payload;
	const newOrder = new Order(new Date().toString(), items, amount, new Date());
	newState.orders.push(newOrder);
	return newState;
};

const ordersReducer: OrderReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ORDER_ACTION:
			return addOrder(state, action);
		default:
			return state;
	}
};

export default ordersReducer;

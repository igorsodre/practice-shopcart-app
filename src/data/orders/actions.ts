import firebase from 'firebase';
import { ThunxDispatcher } from '../../typings';
import { ICartItemHolder } from '../cart/reducer';

export const ADD_ORDER_ACTION = 'ADD_ORDER_ACTION';
export const FETCH_ORDERS_ACTION = 'FETCH_ORDERS_ACTION';

interface IOrdersPayload {
	items: ICartItemHolder;
	amout: number;
	id?: string;
	date?: Date;
}
export interface IAddOrderAction {
	type: typeof ADD_ORDER_ACTION;
	payload: IOrdersPayload;
}
export interface IFetchOrderssAction {
	type: typeof FETCH_ORDERS_ACTION;
	payload: IOrdersPayload[];
}
export type OrderActionType = IAddOrderAction | IFetchOrderssAction;

export const addOrder = (cartItems: ICartItemHolder, totalAmount: number): ThunxDispatcher<OrderActionType> => {
	const action: IAddOrderAction = {
		type: ADD_ORDER_ACTION,
		payload: { items: { ...cartItems }, amout: totalAmount },
	};
	return async (dispatch): Promise<void> => {
		try {
			const date = new Date();
			const response = await firebase
				.database()
				.ref('/orders/u1')
				.push({ ...action.payload, date: date.toISOString() });

			if (response.key) {
				action.payload.id = response.key;
				action.payload.date = date;
				dispatch(action);
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const fetchOrders = (): ThunxDispatcher<IFetchOrderssAction> => {
	return async (dispatch): Promise<void> => {
		try {
			const orders: IOrdersPayload[] = [];
			await firebase
				.database()
				.ref('/orders/u1')
				.once('value', (snapshot) => {
					snapshot.forEach((el) => {
						const order: IOrdersPayload = {
							amout: el.val().amout,
							items: el.val().items,
							id: el.key!,
							date: el.val().date,
						};
						orders.push(order);
					});
				});

			dispatch({
				type: FETCH_ORDERS_ACTION,
				payload: orders,
			});
		} catch (err) {
			console.log('error fetching data');
			console.log(JSON.stringify(err.message, null, ''));
		}
	};
};

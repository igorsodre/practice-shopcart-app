import { combineReducers } from 'redux';
import cartReducer from './cart/reducer';
import dummyData from './dummy-data';
import ordersReducer from './orders/reducer';
import productReducer from './products/reducer';

export const shopcartReducers = combineReducers({
	products: productReducer,
	cart: cartReducer,
	orders: ordersReducer,
});
export type TRootState = ReturnType<typeof shopcartReducers>;
export type TReducerFunction<T = {}, U = {}> = (state: T, action?: U) => T;

export const PRODUCTS = dummyData;

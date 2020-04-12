import { combineReducers } from 'redux';
import productReducer from './products/reducer';
import cartReducer from './cart/reducer';
import dummyData from './dummy-data';

export const shopcartReducers = combineReducers({
	products: productReducer,
	cart: cartReducer,
});

export type TRootState = ReturnType<typeof shopcartReducers>;

export const PRODUCTS = dummyData;

import { combineReducers } from 'redux';
import productReducer from './products/reducer';
import dummyData from './dummy-data';

export const shopcartReducers = combineReducers({
	products: productReducer,
});

export type TRootState = ReturnType<typeof shopcartReducers>;

export const PRODUCTS = dummyData;

import { Product } from '../../models/product';
import PRODUCTS from '../dummy-data';
import { TReducerFunction } from '..';

export interface IProductsState {
	availableProducts: Product[];
	userProducts: Product[];
}

const initialState: IProductsState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter((p) => p.ownerId === 'u1'),
};
type ProcetsReducer = TReducerFunction<IProductsState, any>;
const productReducer: ProcetsReducer = (state = initialState, action) => {
	return state;
};

export default productReducer;

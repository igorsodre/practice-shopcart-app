import { Product } from '../../models/product';
import PRODUCTS from '../dummy-data';

export interface IProductsState {
	availableProducts: Product[];
	userProducts: Product[];
}

const initialState: IProductsState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter((p) => p.ownerId === 'u1'),
};

const productReducer = (state: IProductsState = initialState, action: any) => {
	return state;
};

export default productReducer;

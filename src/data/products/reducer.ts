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
// export type ProductsReducer = TReducerFunction<IProductsState, any>;
const productReducer = (state: IProductsState = initialState, action: any): IProductsState => {
	return state;
};

export default productReducer;

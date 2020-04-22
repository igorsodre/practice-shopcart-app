import R from 'ramda';
import { TReducerFunction } from '..';
import { Product } from '../../models/product';
import {
	CREATE_PRODUCT,
	DELETE_PRODUCT,
	FETCH_PRODUCTS,
	ICreateProductAction,
	IDeleteProductAction,
	IFetchProductsAction,
	IProductActionType,
	IUpdateProductAction,
	UPDATE_PRODUCT,
} from './actions';

export interface IProductsState {
	availableProducts: Product[];
	userProducts: Product[];
}

const initialState: IProductsState = {
	availableProducts: [],
	userProducts: [],
};

export type ProductsReducer = TReducerFunction<IProductsState, IProductActionType>;
const fetchProducts: ProductsReducer = (_, action) => {
	const { products } = action as IFetchProductsAction;
	return {
		availableProducts: [...products],
		userProducts: [...products],
	};
};

const deleteProduct: ProductsReducer = (state, action) => {
	const newState = R.clone(state);
	const pid = (action as IDeleteProductAction).productId;
	newState.userProducts = newState.userProducts.filter((el) => el.id !== pid);
	newState.availableProducts = newState.availableProducts.filter((el) => el.id !== pid);
	return newState;
};

const createProduct: ProductsReducer = (state, action) => {
	console.log('Called create product');
	const newState = R.clone(state);
	const product = (action as ICreateProductAction).product;
	newState.userProducts.push(product);
	newState.availableProducts.push(product);
	return newState;
};

const updateProduct: ProductsReducer = (state, action) => {
	const newState = R.clone(state);
	const product = (action as IUpdateProductAction).product;
	const userProd = newState.userProducts.find((el) => el.id === product.id);
	const availableProd = newState.availableProducts.find((el) => el.id === product.id);
	if (userProd) {
		userProd.description = product.description;
		userProd.imageUrl = product.imageUrl;
		userProd.title = product.title;
	}
	if (availableProd) {
		availableProd.description = product.description;
		availableProd.imageUrl = product.imageUrl;
		availableProd.title = product.title;
	}
	return newState;
};

const productReducer = (state: IProductsState = initialState, action: IProductActionType): IProductsState => {
	switch (action.type) {
		case FETCH_PRODUCTS:
			return fetchProducts(state, action);
		case CREATE_PRODUCT:
			return createProduct(state, action);
		case UPDATE_PRODUCT:
			return updateProduct(state, action);
		case DELETE_PRODUCT:
			return deleteProduct(state, action);
		default:
			return state;
	}
};

export default productReducer;

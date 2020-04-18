import { Product } from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export interface IDeleteProductAction {
	type: typeof DELETE_PRODUCT;
	productId: string;
}

export interface ICreateProductAction {
	type: typeof CREATE_PRODUCT;
	product: Product;
}

export interface IUpdateProductAction {
	type: typeof UPDATE_PRODUCT;
	product: Product;
}

export type IProductActionType = IDeleteProductAction | ICreateProductAction | IUpdateProductAction;

export const deleteProduct = (productId: string): IProductActionType => {
	return {
		type: DELETE_PRODUCT,
		productId,
	};
};

export const createProduct = (
	title: string,
	description: string,
	imageUrl: string,
	price: string,
): IProductActionType => {
	const prod = new Product(new Date().toString(), 'n1', title, imageUrl, description, Number(price));

	return {
		type: CREATE_PRODUCT,
		product: prod,
	};
};

export const updateProduct = (id: string, title: string, description: string, imageUrl: string): IProductActionType => {
	const prod = new Product(id, 'n1', title, imageUrl, description, 0);

	return {
		type: UPDATE_PRODUCT,
		product: prod,
	};
};

import firebase from 'firebase';
import { Product } from '../../models/product';
import { ThunxDispatcher } from '../../typings';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export interface IFetchProductsAction {
	type: typeof FETCH_PRODUCTS;
	products: Product[];
}
export interface ICreateProductAction {
	type: typeof CREATE_PRODUCT;
	product: Product;
}

export interface IUpdateProductAction {
	type: typeof UPDATE_PRODUCT;
	product: Product;
}

export interface IDeleteProductAction {
	type: typeof DELETE_PRODUCT;
	productId: string;
}

export type IProductActionType =
	| IDeleteProductAction
	| ICreateProductAction
	| IUpdateProductAction
	| IFetchProductsAction;

export const fetchProducts = (): ThunxDispatcher<IFetchProductsAction> => {
	return async (dispatch): Promise<void> => {
		try {
			const products: Product[] = [];
			await firebase
				.database()
				.ref('/products')
				.once('value', (snapshot) => {
					snapshot.forEach((el) => {
						const prod = new Product(
							el.key!,
							'u1',
							el.val().title,
							el.val().imageUrl,
							el.val().description,
							Number(el.val().price),
						);
						products.push(prod);
					});
				});
			dispatch({
				type: FETCH_PRODUCTS,
				products: products,
			});
		} catch (err) {
			console.log('error fetching data');
			console.log(JSON.stringify(err.message, null, ''));
		}
	};
};

export const createProduct = (
	title: string,
	description: string,
	imageUrl: string,
	price: string,
): ThunxDispatcher<ICreateProductAction> => {
	return async (dispatch): Promise<void> => {
		try {
			const response = await firebase
				.database()
				.ref('/products')
				.push({
					title,
					description,
					imageUrl,
					price: Number(price),
				});

			if (response.key) {
				const prod = new Product(response.key, 'n1', title, imageUrl, description, Number(price));
				dispatch({
					type: CREATE_PRODUCT,
					product: prod,
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const updateProduct = (id: string, title: string, description: string, imageUrl: string): IProductActionType => {
	const prod = new Product(id, 'n1', title, imageUrl, description, 0);

	return {
		type: UPDATE_PRODUCT,
		product: prod,
	};
};

export const deleteProduct = (productId: string): IProductActionType => {
	return {
		type: DELETE_PRODUCT,
		productId,
	};
};

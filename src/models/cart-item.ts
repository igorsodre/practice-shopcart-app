export class CartItem {
	constructor(public quantity: number, public price: number, public title: string, public sum: number) {}
}

export const icrementCartItem = (ci: CartItem): CartItem => {
	return new CartItem(ci.quantity + 1, ci.price, ci.title, ci.sum + ci.price);
};

export const decrementCartItem = (ci: CartItem): CartItem => {
	return new CartItem(ci.quantity - 1, ci.price, ci.title, ci.sum - ci.price);
};

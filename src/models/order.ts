import { ICartItemHolder } from '../data/cart/reducer';

export class Order {
	constructor(public id: string, public items: ICartItemHolder, public totalAmount: number, public date: Date) {}
}

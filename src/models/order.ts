import { ICartItemHolder } from '../data/cart/reducer';
import moment from 'moment';

export class Order {
	constructor(public id: string, public items: ICartItemHolder, public totalAmount: number, public date: Date) {}
}

export const getReadableDate = (order: Order): string => {
	return moment(order.date).format('Do MMMM YYYY, hh:mm');
};

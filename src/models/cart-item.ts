export class CartItem {
	constructor(public quantity: number, public price: number, public title: string, public sum: number) {}
	public icrementItem(): void {
		this.quantity += 1;
		this.sum += this.price;
	}
}

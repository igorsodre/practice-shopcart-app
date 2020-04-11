export class Product {
	constructor(
		public id: number,
		public ownerId: number,
		public title: string,
		public imageUrl: string,
		public description: string,
		public price: string,
	) {}
}

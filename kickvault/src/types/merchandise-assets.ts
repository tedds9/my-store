export interface MerchandiseAsset {
  readonly id: string;
  readonly name: string;
  readonly brand: string;
  readonly price: number;
  readonly image: string;
  readonly category: string;
  readonly sizes: number[];
}
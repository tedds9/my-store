import { MerchandiseAsset } from "./merchandise-assets";

export interface BasketSelection {
  readonly id: string;
  readonly assetId: string;
  readonly selectedSize: string;
  readonly quantity: number;
}

export interface CartLineItem extends Omit<MerchandiseAsset, 'sizes'> {
  readonly assetId: string;
  readonly selectedSize: string;
  readonly quantity: number;
}
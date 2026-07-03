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


export interface TelemetryNode {
  readonly sku: string;
  readonly count: number;
}

export interface ReceiptSnapshot {
  readonly receiptId?: string;
  readonly snapshot?: readonly TelemetryNode[];
}
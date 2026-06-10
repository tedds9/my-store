export interface MerchandiseAsset {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  isFavorite: boolean;
  sizes: number[];
}
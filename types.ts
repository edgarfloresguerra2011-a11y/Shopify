
export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum ViewMode {
  HOME = 'HOME',
  SHOP = 'SHOP',
  PRODUCT = 'PRODUCT',
  CART = 'CART',
  CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS',
  STORY = 'STORY',
  SUSTAINABILITY = 'SUSTAINABILITY',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS',
  SUPPORT = 'SUPPORT'
}

export type Language = 'ES' | 'EN' | 'FR' | 'DE' | 'ZH';

export interface Dictionary {
  [key: string]: {
    [lang in Language]: string;
  };
}

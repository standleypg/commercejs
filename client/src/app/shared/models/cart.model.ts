import { Product } from './product.model';

export interface Cart {
  id: string;
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface StripeCart {
  items: Array<CartItem>;
}

export interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  id: string;
}

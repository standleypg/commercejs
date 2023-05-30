import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsApiAction } from './products.action';

export const initialState: Product[] = [];

export const productReducer = createReducer(
  initialState,
  on(ProductsApiAction.loadProducts, (_state, { products }) => products)
);

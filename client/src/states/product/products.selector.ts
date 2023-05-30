import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.model';

export const selectProducts = createFeatureSelector<Product[]>('products');

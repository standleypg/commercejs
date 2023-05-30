import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Cart } from 'src/app/shared/models/cart.model';
import { CartState, cartAdapter } from './carts.reducer';

export const selectCartState = createFeatureSelector<CartState>('carts');

export const selectCarts = createSelector(
  selectCartState,
  cartAdapter.getSelectors().selectAll
);

export const selectCartById = (id: string) =>
  createSelector(selectCarts, (state) => {
    return state.filter((cart: Cart) => cart.id === id)[0];
  });

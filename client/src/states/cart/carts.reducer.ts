import { createReducer, on } from '@ngrx/store';
import { Cart } from 'src/app/shared/models/cart.model';
import { CartsAction } from './carts.action';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface CartState extends EntityState<Cart> {}

export const cartAdapter = createEntityAdapter<Cart>();

export const initialState: CartState = cartAdapter.getInitialState();

export const cardReducer = createReducer(
  initialState,
  on(CartsAction.addCart, (state, { cart }) => {
    console.log('addCart reducer is called');
    return cartAdapter.addOne(cart, state);
  }),
  on(CartsAction.removeCart, (state, { id }) => {
    return cartAdapter.removeOne(id, state);
  }),
  on(CartsAction.updateCart, (state, { id, quantity, totalPrice }) => {
    console.log('updateCart reducer is called');
    return cartAdapter.updateOne(
      {
        id,
        changes: { quantity, totalPrice },
      },
      state
    );
  }),
  on(CartsAction.removeAllCarts, (state) => cartAdapter.removeAll(state)),
  on(CartsAction.loadCarts, (state, { carts }) =>
    cartAdapter.setAll(carts, state)
  )
);

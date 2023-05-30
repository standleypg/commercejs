import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Cart } from 'src/app/shared/models/cart.model';

export const CartsAction = createActionGroup({
  source: 'Carts',
  events: {
    'Add Cart': props<{ cart: Cart }>(),
    'Remove Cart': props<{ id: string }>(),
    'Update Cart': props<{
      id: string;
      quantity: number;
      totalPrice: number;
    }>(),
    'Remove All Carts': emptyProps(),
    'Load Carts': props<{ carts: Cart[] }>(),
  },
});

// export const CartsApiAction = createActionGroup({
//   source: 'Carts API',
//   events: {
//     'Load Carts': props<{ carts: Cart[] }>(),
//   },
// });

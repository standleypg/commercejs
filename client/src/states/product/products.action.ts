import { createActionGroup, props } from '@ngrx/store';
import { Cart } from 'src/app/shared/models/cart.model';
import { Product } from 'src/app/shared/models/product.model';

export const ProductsApiAction = createActionGroup({
  source: 'Products API',
  events: {
    'Load Products': props<{ products: Product[] }>(),
  },
});

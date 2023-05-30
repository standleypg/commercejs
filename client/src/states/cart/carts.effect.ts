import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartsAction } from './carts.action';
import { map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/shared/services/cart.service';
import { selectCarts } from './carts.selector';
import { UserCart } from 'src/app/shared/models/user-cart.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Cart } from 'src/app/shared/models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartEffects {
  carts$ = this.store.select(selectCarts);
  carts: Cart[] = [];
  constructor(
    private actions$: Actions,
    private store: Store,
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.carts$.subscribe((carts) => {
      this.carts = carts;
    });
  }

  addCart$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CartsAction.addCart),
        tap(() => {
          const userCart: UserCart = {
            id: this.authService.getUser.uid,
            carts: this.carts,
          };
          this.cartService.add(userCart);
        })
      );
    },
    { dispatch: false }
  );
  updateCart$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CartsAction.updateCart),
        tap(() => {
          const userCart: UserCart = {
            id: this.authService.getUser.uid,
            carts: this.carts,
          };
          this.cartService.update(userCart.id, userCart);
        })
      );
    },
    { dispatch: false }
  );

  removeCart$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CartsAction.removeCart),
        tap((action) => {
          const userCart: UserCart = {
            id: this.authService.getUser.uid,
            carts: this.carts.filter((cart) => cart.id !== action.id),
          };
          this.cartService.update(userCart.id, userCart);
        })
      );
    },
    { dispatch: false }
  );

  removeAllCart$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CartsAction.removeAllCarts),
        tap(() => {
          this.cartService.delete(this.authService.getUser.uid);
        })
      );
    },
    { dispatch: false }
  );
}

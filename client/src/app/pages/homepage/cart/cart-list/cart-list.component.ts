import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription, take } from 'rxjs';
import { Cart } from 'src/app/shared/models/cart.model';
import { CartsAction } from 'src/states/cart/carts.action';
import { selectCartById, selectCarts } from 'src/states/cart/carts.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent {
  carts$ = this.store.select(selectCarts);
  subtotal: number = 0;
  cartSubscription: Subscription | undefined;
  storeSubscription: Subscription | undefined;

  constructor(
    private store: Store,
    private modalService: NzModalService,
    private router: Router
  ) {}

  ngAfterContentInit() {
    this.cartSubscription = this.carts$.subscribe((carts) => {
      this.subtotal = carts.reduce((acc, cart) => {
        return acc + cart.totalPrice;
      }, 0);
    });
  }

  updateCart(cart: Cart, isIncemental: boolean = true) {
    this.storeSubscription = this.store
      .select(selectCartById(cart.id))
      .pipe(take(1))
      .subscribe((existingCart) => {
        if (existingCart) {
          const quantity = isIncemental
            ? existingCart.quantity + 1
            : existingCart.quantity - 1;

          if (quantity <= 0) {
            this.modalService.confirm({
              nzTitle: 'Remove Item?',
              nzContent: 'Item will be removed from the cart.',
              nzOkText: 'Remove',
              nzOkDanger: true,
              nzCancelText: 'Cancel',
              nzOnOk: () => {
                this.store.dispatch(
                  CartsAction.removeCart({ id: existingCart.id })
                );
              },
              nzOnCancel: () => {
                this.store.dispatch(
                  CartsAction.updateCart({
                    id: existingCart.id,
                    quantity: 1,
                    totalPrice: existingCart.product.price.raw,
                  })
                );
              },
            });
            return;
          }

          this.store.dispatch(
            CartsAction.updateCart({
              id: existingCart.id,
              quantity,
              totalPrice: isIncemental
                ? existingCart.totalPrice + existingCart.product.price.raw
                : existingCart.totalPrice - existingCart.product.price.raw,
            })
          );
        }
      });
  }

  checkout() {
    this.router.navigate(['homepage/carts/checkout']);
  }

  emptyCart() {
    this.modalService.confirm({
      nzTitle: 'Remove all items?',
      nzContent: 'All item will be removed from the cart.',
      nzOkText: 'Remove All',
      nzOkDanger: true,
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.store.dispatch(CartsAction.removeAllCarts());
      },
    });
  }
  ngOnDestroy() {
    if (this.cartSubscription) this.cartSubscription.unsubscribe();
    if (this.storeSubscription) this.storeSubscription.unsubscribe();
  }
}

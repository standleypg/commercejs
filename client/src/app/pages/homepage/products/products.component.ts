import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/shared/models/product.model';
import { selectProducts } from 'src/states/product/products.selector';
import { Cart } from 'src/app/shared/models/cart.model';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartsAction } from 'src/states/cart/carts.action';
import { selectCartById, selectCarts } from 'src/states/cart/carts.selector';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  isProductsLoaded = false;
  products$ = this.store.select(selectProducts);
  carts$ = this.store.select(selectCarts);
  userId: string;
  storeSubscription: Subscription | undefined;
  productSubscription: Subscription | undefined;
  constructor(private store: Store, private auth: AuthService) {
    this.userId = auth.getUser;
  }

  ngOnInit() {
    this.checkProductsIsLoaded();
  }

  addToCart(product: Product) {
    this.storeSubscription = this.store
      .select(selectCartById(product.id))
      .pipe(take(1))
      .subscribe((existingCart) => {
        if (existingCart) {
          this.store.dispatch(
            CartsAction.updateCart({
              id: existingCart.id,
              quantity: existingCart.quantity + 1,
              totalPrice:
                existingCart.totalPrice + existingCart.product.price.raw,
            })
          );
        } else {
          let cart: Cart = {
            id: product.id,
            product,
            quantity: 1,
            totalPrice: 1 * product.price.raw,
          };
          this.store.dispatch(CartsAction.addCart({ cart }));
        }
      });
  }

  checkProductsIsLoaded() {
    this.products$.subscribe((products) => {
      if (products.length > 0) {
        this.isProductsLoaded = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}

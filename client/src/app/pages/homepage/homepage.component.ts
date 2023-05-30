import { Component } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { UserCart } from 'src/app/shared/models/user-cart.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CommercejsService } from 'src/app/shared/services/commercejs.service';
import { CartsAction } from 'src/states/cart/carts.action';
import { selectCarts } from 'src/states/cart/carts.selector';
import { ProductsApiAction } from 'src/states/product/products.action';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  carts$ = this.store.select(selectCarts);
  cartsCount: number = 0;
  cartSubscription: Subscription | undefined;

  constructor(
    private cjsService: CommercejsService,
    private store: Store,
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.cartSubscription = this.carts$.subscribe((carts) => {
      this.cartsCount = carts.reduce((acc, cart) => {
        return acc + cart.quantity;
      }, 0);
    });
  }

  async ngOnInit() {
    this.cartService
      .getById(this.authService.getUser.uid)
      .subscribe((userCart: UserCart) => {
        if (userCart)
          this.store.dispatch(CartsAction.loadCarts({ carts: userCart.carts }));
      });
    const products: Product[] = await this.cjsService.GetProducts();
    this.store.dispatch(ProductsApiAction.loadProducts({ products }));
  }
  ngOnDestroy() {
    if (this.cartSubscription) this.cartSubscription.unsubscribe();
  }
}

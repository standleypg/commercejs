import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCarts } from 'src/states/cart/carts.selector';
import { Payment } from 'src/app/shared/models/payment.model';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Cart, CartItem, StripeCart } from 'src/app/shared/models/cart.model';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

// export enum CartView {
//   Checkout = 'checkout',
//   Payment = 'payment',
// }

// export interface CurrentView {
//   checkout: boolean;
//   payment: boolean;
// }

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  current = 0;
  totalAmout: number = 0;
  payment?: Payment;
  url: string = '/homepage/carts/checkout/payment-form';
  carts$ = this.store.select(selectCarts);
  forwardButtonTexts = ['Pay Now'];
  backwardButtonTexts = ['Back To Cart'];
  nextButton = this.forwardButtonTexts[0];
  backButton = this.backwardButtonTexts[0];

  carts: StripeCart = { items: [] };
  cartSubscription: Subscription | undefined;
  constructor(
    private store: Store,
    private router: Router,
    private auth: AuthService,
    private http: HttpClient
  ) {}

  // currentView: CurrentView = { checkout: true, payment: false };

  ngOnInit(): void {
    this.cartSubscription = this.carts$.subscribe((carts) => {
      let c: Array<CartItem> = carts.map((cart: Cart) => {
        this.totalAmout = carts.reduce((acc, cart) => acc + cart.totalPrice, 0);
        return {
          product: cart.product.id,
          name: cart.product.name,
          price: cart.product.price.raw * 100,
          quantity: cart.quantity,
          id: cart.id,
        };
      });
      this.carts.items = c;
    });
  }

  next() {
    this.current += 1;
    if (this.current > 0) {
      this.onCheckout();
      this.current = 0;
    }

    this.nextButton = this.forwardButtonTexts[this.current];
    this.backButton = this.backwardButtonTexts[this.current];
  }
  back() {
    this.current -= 1;

    if (this.current < 0) {
      this.router.navigate(['/homepage/carts']);
      return;
    }
    this.nextButton = this.forwardButtonTexts[this.current];
    this.backButton = this.backwardButtonTexts[this.current];
  }

  //Stripe v3 setup
  onCheckout() {
    this.http
      .post('http://localhost:4242/create-checkout-session', {
        // items: this.e.items,
        // items: this.d.items,
        items: this.carts.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          environment.stripe.STRIPE_PUBLISHABLE_KEY
        );
        stripe?.redirectToCheckout({ sessionId: res.id });
        localStorage.setItem('session_id', res.id);
      });
  }
  ngOnDestroy() {
    if (this.cartSubscription) this.cartSubscription.unsubscribe();
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';
import { CartsAction } from 'src/states/cart/carts.action';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss'],
})
export class PaymentSuccessComponent {
  username: string = '';
  orderNumber?: string;
  session_id?: string;
  constructor(
    private router: Router,
    private store: Store,
    private auth: AuthService,
    private cartService: CartService,
    private http: HttpClient
  ) {}

  goToHomepage() {
    this.router.navigate(['/homepage/products']);
  }

  ngOnInit(): void {
    this.username = this.auth.getUser.displayName;

    const uuid = UUID.UUID();
    this.orderNumber = `ref_no-${uuid.substring(0, uuid.indexOf('-'))}-${moment(
      new Date().getTime()
    ).format('DD-MM-YYYY')}`;

    const session_id = this.cartService.getSessionId;
    if (session_id) {
      this.http
        .get(
          `https://api.stripe.com/v1/checkout/sessions/completed_webhook_delivered/${session_id}?key=${environment.stripe.STRIPE_PUBLISHABLE_KEY}`
        )
        .subscribe((res: any) => {
          if (res.completed) {
            this.store.dispatch(CartsAction.removeAllCarts());
            localStorage.removeItem('session_id');
          }
        });
    }
  }
}

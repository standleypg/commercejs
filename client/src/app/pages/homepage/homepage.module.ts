import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzImageModule } from 'ng-zorro-antd/image';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { LogoutComponent } from './logout/logout.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CheckoutFooterComponent } from './components/checkout-footer/checkout-footer.component';
import { PaymentDetailsComponent } from './cart/checkout/payment-details/payment-details.component';
import { PaymentSuccessComponent } from './cart/checkout/payment-success/payment-success.component';
import { CheckoutHeaderComponent } from './components/checkout-header/checkout-header.component';

@NgModule({
  declarations: [
    HomepageComponent,
    CartComponent,
    ProductsComponent,
    LogoutComponent,
    CartListComponent,
    CheckoutComponent,
    CheckoutFooterComponent,
    PaymentDetailsComponent,
    PaymentSuccessComponent,
    CheckoutHeaderComponent,
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzSpinModule,
    NzGridModule,
    NzCardModule,
    NzBadgeModule,
    NzEmptyModule,
    NzListModule,
    NzStepsModule,
    NzDescriptionsModule,
    NzResultModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule,
    NzImageModule,
  ],
  providers: [],
})
export class HomepageModule {}

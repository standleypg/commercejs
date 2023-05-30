import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { PaymentSuccessComponent } from './cart/checkout/payment-success/payment-success.component';
import { CheckoutGuard } from 'src/app/shared/guards/checkout.guard';
import { PaymentSuccessGuard } from 'src/app/shared/guards/payment-success.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'carts',
        component: CartComponent,
        children: [
          {
            path: '',
            redirectTo: 'cart-list',
            pathMatch: 'full',
          },
          {
            path: 'cart-list',
            component: CartListComponent,
          },
          {
            path: 'checkout',
            canActivate: [CheckoutGuard],
            component: CheckoutComponent,
          },
          {
            path: 'payment-success',
            canActivate: [PaymentSuccessGuard],
            component: PaymentSuccessComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}

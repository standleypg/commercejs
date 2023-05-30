import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkout-header',
  templateUrl: './checkout-header.component.html',
  styleUrls: ['./checkout-header.component.scss'],
})
export class CheckoutHeaderComponent {
  @Input() current: number = 0;
}

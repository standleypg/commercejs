import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-footer',
  templateUrl: './checkout-footer.component.html',
  styleUrls: ['./checkout-footer.component.scss'],
})
export class CheckoutFooterComponent {
  constructor(private router: Router) {}
  @Input() rightButtonText!: string;
  @Input() leftButtonText!: string;
  @Input() rightButtonVisible: boolean = true;
  @Input() leftButtonVisible: boolean = true;
  @Output() rightButtonEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() leftButtonEvent: EventEmitter<any> = new EventEmitter<any>();
  right() {
    this.rightButtonEvent.emit();
  }
  left() {
    this.leftButtonEvent.emit();
  }
}

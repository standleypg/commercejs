import { TestBed } from '@angular/core/testing';

import { PaymentSuccessGuard } from './payment-success.guard';

describe('PaymentSuccessGuard', () => {
  let guard: PaymentSuccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PaymentSuccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

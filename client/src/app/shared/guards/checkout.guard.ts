import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart.model';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCarts } from 'src/states/cart/carts.selector';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}
  carts$ = this.store.select(selectCarts);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.carts$.subscribe((carts) => {
      if (carts.length == 0) {
        this.router.navigate(['homepage/carts']);
      }
    });

    return true;
  }
}

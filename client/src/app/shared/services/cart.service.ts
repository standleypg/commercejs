import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { UserCart } from '../models/user-cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private dbPath = '/carts';
  cartsRef: AngularFirestoreCollection<UserCart>;

  constructor(private firestore: AngularFirestore) {
    this.cartsRef = firestore.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<UserCart> {
    return this.cartsRef;
  }

  getById(id: string): any {
    // const res = this.cartsRef.doc(id).valueChanges();
    return this.cartsRef.doc(id).valueChanges();
  }

  add(cart: UserCart): any {
    return this.cartsRef.doc(cart.id).set({ ...cart });
  }

  update(id: string, data: any): Promise<void> {
    return this.cartsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.cartsRef.doc(id).delete();
  }

  get getSessionId(): string | null {
    return localStorage.getItem('session_id') || null;
  }
}

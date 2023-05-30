import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { userInfo } from 'os';
import { firstValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async GoogleAuth() {
    return await this._GoogleAuth(new auth.GoogleAuthProvider());
  }

  async _GoogleAuth(provider: auth.GoogleAuthProvider) {
    const result = await this.afAuth.signInWithPopup(provider);
    try {
      if (result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
        this.router.navigate(['homepage']);
      }
    } catch (error) {
      console.error(error);
    }
  }

  getTokenId() {
    return firstValueFrom(this.afAuth.idToken);
  }

  async SignOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('session_id');
    this.router.navigate(['']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  get getUser(): any {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user;
  }
}

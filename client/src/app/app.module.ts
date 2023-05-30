import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { IconDefinition } from '@ant-design/icons-angular';

import {
  GoogleOutline,
  LogoutOutline,
  ShoppingCartOutline,
  ShoppingTwoTone,
  FireTwoTone,
  LoadingOutline,
  PlusCircleTwoTone,
  MinusCircleTwoTone,
  PlusOutline,
  MinusOutline,
  ShoppingOutline,
} from '@ant-design/icons-angular/icons';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from 'src/states/product/products.reducer';
import { CartEffects } from 'src/states/cart/carts.effect';
import { cardReducer } from 'src/states/cart/carts.reducer';
import { HttpClientModule } from '@angular/common/http';

const icons: IconDefinition[] = [
  GoogleOutline,
  LogoutOutline,
  ShoppingCartOutline,
  ShoppingTwoTone,
  FireTwoTone,
  LoadingOutline,
  PlusCircleTwoTone,
  MinusCircleTwoTone,
  PlusOutline,
  MinusOutline,
  ShoppingOutline,
];
@NgModule({
  declarations: [AppComponent, LoginComponent, NotFoundComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    NzButtonModule,
    NzIconModule.forRoot(icons),
    NzDividerModule,
    NzModalModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    StoreModule.forRoot({
      products: productReducer,
      carts: cardReducer,
    }),
    EffectsModule.forRoot([CartEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

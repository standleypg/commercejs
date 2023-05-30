import { Injectable } from '@angular/core';
import * as Commerce from '@chec/commerce.js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CommercejsService {
  commerce: any;
  constructor() {
    this.commerce = new Commerce(environment.commercejsConfig.publicApiKey);
  }

  async GetProducts(): Promise<Product[]> {
    const res = await this.commerce.products.list();
    return res.data;
  }
}

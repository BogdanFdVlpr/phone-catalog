import { Injectable } from '@angular/core';
import {IProducts} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class QuantityGoodsService {
  calculateQuantity(products: IProducts[], category: string): number {
    return products.filter(product => product.category === category).length;
  }


}

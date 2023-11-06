import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IProducts} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  productDetailsSubject = new BehaviorSubject<IProducts>({fullPrice: 0, id: 0, name: "", price: 0, year: 0})

  productDetails$ = this.productDetailsSubject.asObservable()

  setProductDetails(product: any) {
    this.productDetailsSubject.next(product)
  }
}

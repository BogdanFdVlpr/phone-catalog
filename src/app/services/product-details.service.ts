import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  productDetailsSubject = new BehaviorSubject([])

  productDetails$ = this.productDetailsSubject.asObservable()

  setProductDetails(product: any) {
    this.productDetailsSubject.next(product)
  }
}

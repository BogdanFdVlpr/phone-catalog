import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartBadgeService {
  cartBadgeSubject = new BehaviorSubject(0)

  cartBadge$ = this.cartBadgeSubject.asObservable()

  setCartBadge(quantity: number) {
    this.cartBadgeSubject.next(quantity)
  }
}

import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  constructor() { }

  private foundProductsSubject = new BehaviorSubject<boolean>(false);

  foundProducts$ = this.foundProductsSubject.asObservable();

  setFoundProducts(found: boolean) {
    this.foundProductsSubject.next(found);
  }
}

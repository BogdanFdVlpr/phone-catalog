import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProducts} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class GetProductService {

  constructor(
    private http: HttpClient
  ) { }

  productsApi = 'https://mate-academy.github.io/react_phone-catalog/_new/products'

  getAllProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.productsApi + '.json')
  }

  getDetailsAboutProduct(itemId: string) {
    return this.http.get(this.productsApi + `/${itemId}` + '.json')
  }
}

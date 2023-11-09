import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {GetProductService} from "./get-product.service";
import {IProducts} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class DataStateService {

  phones$: BehaviorSubject<IProducts[]> = new BehaviorSubject<IProducts[]>([]);
  phoneDetails$: BehaviorSubject<any> = new BehaviorSubject<any>({})

   constructor(
    private getProductService: GetProductService,
  ) {
    this.loadPhones()
  }

  loadPhones(): void {
    this.getProductService.getAllProducts().subscribe(products => this.phones$.next(products))
  }
}



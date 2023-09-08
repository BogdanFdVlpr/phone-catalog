import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {GetProductService} from "./get-product.service";
import {IProducts} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class DataStateService {

  phones$: BehaviorSubject<IProducts[]> = new BehaviorSubject<IProducts[]>([])
  searchValue$: BehaviorSubject<string> = new BehaviorSubject<string>('')



   constructor(
    private getProductService: GetProductService,
  ) {
    this.loadPhones()
  }

  loadPhones(): void {
    this.getProductService.getAllProducts().subscribe(products => this.phones$.next(products))
  }

  onSearchValueChange(inputValue: string) {
    this.searchValue$.next(inputValue)
  }
}



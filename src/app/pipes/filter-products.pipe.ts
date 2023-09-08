import { Pipe, PipeTransform } from '@angular/core';
import {IProducts} from "../models/product";

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: IProducts[], search: string): IProducts[] {
    if (!search) return products
    return products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
  }
}


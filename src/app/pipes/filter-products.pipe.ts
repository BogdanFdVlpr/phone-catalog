import { Pipe, PipeTransform } from '@angular/core';
import {IProducts} from "../models/product";

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: IProducts[], search: string): IProducts[] {
    console.log(search)
    if (!search) return products
    return products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  }
}


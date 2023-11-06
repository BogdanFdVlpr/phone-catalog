import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from "../../services/product-details.service";
import {IProducts} from "../../models/product";

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {
  productDetails!: IProducts;
  phoneFolder: string = '';
  phoneColor: string = '';


  constructor(private productDetailsService: ProductDetailsService) {}

  ngOnInit(): void {
    this.productDetailsService.productDetails$.subscribe((product: IProducts) => {
      if (product) {
        this.productDetails = product;
      }
    });
    const phoneArray = this.productDetails.phoneId!.split('-');
    this.phoneFolder = phoneArray.slice(0, -2).join('-');
    this.phoneColor = phoneArray.slice(-1).join('-');
  }


  get imageSource(): string {
    return `/assets/img/phones/${this.phoneFolder}/${this.phoneColor}/`;
  }
}

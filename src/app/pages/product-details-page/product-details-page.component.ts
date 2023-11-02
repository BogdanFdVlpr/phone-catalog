import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from "../../services/product-details.service";

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {
  productDetails: any;

  constructor(private productDetailsService: ProductDetailsService) {}

  ngOnInit(): void {
    this.productDetailsService.productDetails$.subscribe((product) => {
      if (product) {
        this.productDetails = product;
      }
    });
    console.log(this.productDetails[0]);
  }
}

import {Component, Input, OnInit, Output} from '@angular/core';
import {QuantityGoodsService} from "../../services/quantityGoods.service";
import {GetProductService} from "../../services/get-product.service";
import {IProducts} from "../../models/product";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-file-loader";

@Component({
  selector: 'app-phones-page',
  templateUrl: './phones-page.component.html',
  styleUrls: ['./phones-page.component.scss']
})
export class PhonesPageComponent implements OnInit{
  isLoading: boolean = true;

  quantityPhones: number = 0;

  constructor(
    public getProductService: GetProductService,
    public quantityGoodsService: QuantityGoodsService,
  ) { }

  ngOnInit(): void {
    this.getProductService.getAllProducts().subscribe( (products) => {
      this.quantityPhones = this.quantityGoodsService.calculateQuantity(products, 'phones')
    })
  }
}

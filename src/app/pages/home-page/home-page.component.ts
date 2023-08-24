import {Component, OnInit} from '@angular/core';
import {GetProductService} from "../../services/get-product.service";
import {QuantityGoodsService} from "../../services/quantityGoods.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  quantityPhones: number = 0;
  quantityTablets = 0;
  quantityAccessories = 0;



  constructor(
    public getProductService: GetProductService,
    public quantityGoodsService: QuantityGoodsService
  ) {
  }

  ngOnInit(): void {

    this.getProductService.getAllProducts().subscribe( (products) => {
      this.quantityPhones = this.quantityGoodsService.calculateQuantity(products, 'phones')
    })
  }

}

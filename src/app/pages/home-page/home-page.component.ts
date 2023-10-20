import {Component, OnInit} from '@angular/core';
import {GetProductService} from "../../services/get-product.service";
import {QuantityGoodsService} from "../../services/quantityGoods.service";
import {PaginationAccessService} from "../../services/pagination-access.service";

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
    public quantityGoodsService: QuantityGoodsService,
    private paginationAccessService: PaginationAccessService,
  ) {
  }

  ngOnInit(): void {
    this.getProductService.getAllProducts().subscribe( (products) => {
      this.quantityPhones = this.quantityGoodsService.calculateQuantity(products, 'phones')
    })
    this.paginationAccessService.setPaginationAccess(false);
  }

}

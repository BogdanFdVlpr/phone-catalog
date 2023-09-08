import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QuantityGoodsService} from "../../services/quantityGoods.service";
import {GetProductService} from "../../services/get-product.service";
import {IProducts} from "../../models/product";
import {GetTitleUrlService} from "../../services/getTitleUrl.service";

@Component({
  selector: 'app-phones-page',
  templateUrl: './phones-page.component.html',
  styleUrls: ['./phones-page.component.scss']
})
export class PhonesPageComponent implements OnInit {
  isLoading: boolean = true;
  products?: IProducts[];
  quantityPhones: number = 0;
  @Input() inputText!: string;

  constructor(
    public getProductService: GetProductService,
    public quantityGoodsService: QuantityGoodsService,
  ) {
  }

  ngOnInit(): void {
    this.getProductService.getAllProducts().subscribe( (products) => {
      this.quantityPhones = this.quantityGoodsService.calculateQuantity(products, 'phones')
    })
  }


}

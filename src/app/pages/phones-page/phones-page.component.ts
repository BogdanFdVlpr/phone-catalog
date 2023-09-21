import {Component, OnInit,} from '@angular/core';
import {QuantityGoodsService} from "../../services/quantityGoods.service";
import {GetProductService} from "../../services/get-product.service";
import {IProducts} from "../../models/product";
import {ProductSearchService} from "../../services/product-search.service";
import {ChooseItemsOnPageService} from "../../services/chooseItemsOnPage.service";

@Component({
  selector: 'app-phones-page',
  templateUrl: './phones-page.component.html',
  styleUrls: ['./phones-page.component.scss']
})
export class PhonesPageComponent implements OnInit {
  isLoading: boolean = true;
  products?: IProducts[];
  quantityPhones: number = 0;

  constructor(
    public getProductService: GetProductService,
    public quantityGoodsService: QuantityGoodsService,
    public productSearchService: ProductSearchService,
    private paginationService: ChooseItemsOnPageService,
  ) {
  }

  ngOnInit(): void {
    this.getProductService.getAllProducts().subscribe( (products) => {
      this.quantityPhones = this.quantityGoodsService.calculateQuantity(products, 'phones')
    })
  }

  onPageChange(event: any) {
    const page = event.pageIndex + 1;
    this.paginationService.setCurrentPage(page);
  }

}

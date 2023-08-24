import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {GetProductService} from "../../services/get-product.service";
import {IProducts} from "../../models/product";
import {delay, Subscription} from "rxjs";

@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.scss']
})

export class ProductsSliderComponent implements OnInit {
  @Input() title!: string;
  @Input() oldPrice?: boolean;
  @Input() sortProduct?: string;
  @Input() buttonScroll?: boolean;
  @Input() flexWrap?: boolean;
  @Input() changeLoading?: boolean;

  products: IProducts[] = [];

  constructor(
    public getProductService: GetProductService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    if (this.sortProduct) {
      this.getProductService.getAllProducts().subscribe(products => {
        this.products = this.sortProducts(products);
      })
    } else {
      console.log(`'product-slider:' ${this.changeLoading}`)

      this.getProductService.getAllProducts().pipe(
        delay(2000),
      ).subscribe(products => {
        this.products = products;
        this.changeLoading = false
        console.log(`'product-slider:' ${this.changeLoading}`)
      });
    }
  };

  sortProducts(products: IProducts[]): IProducts[] {
    if (this.sortProduct === 'hotPrice') {
      return products.slice().sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));
    } else if (this.sortProduct === 'newProduct') {
      return products.slice().sort((a, b) => b.price - a.price);
    }
    return products
  }

  scrollCardsRight() {
    const cardsElement = this.elementRef.nativeElement.querySelector('.cards');
    cardsElement.scrollLeft += 288;
  }
  scrollCardsLeft() {
    const cardsElement = this.elementRef.nativeElement.querySelector('.cards');
    cardsElement.scrollLeft -= 288;
  }
}

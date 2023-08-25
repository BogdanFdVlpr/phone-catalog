import {Component, ElementRef, Input, OnInit, Output} from '@angular/core';
import {GetProductService} from "../../services/get-product.service";
import {IProducts} from "../../models/product";
import {delay} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  @Input() title!: string;
  @Input() oldPrice?: boolean;
  @Input() sortProduct?: string;
  @Input() buttonScroll?: boolean;
  @Input() flexWrap?: boolean;
  @Input() isLoading?: boolean;

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
      console.log(`'product-slider:' ${this.isLoading}`)

      this.getProductService.getAllProducts().pipe(
        delay(2000),
      ).subscribe(products => {
        this.products = products;
        this.isLoading = false;
        console.log(`'product-slider:' ${this.isLoading}`)
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
    cardsElement.scrollLeft += 289;
  }
  scrollCardsLeft() {
    const cardsElement = this.elementRef.nativeElement.querySelector('.cards');
    cardsElement.scrollLeft -= 289;
  }
}
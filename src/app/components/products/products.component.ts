import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetProductService} from "../../services/get-product.service";
import {IProducts} from "../../models/product";
import  {delay} from "rxjs";
import * as events from "events";

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
  @Input() marginTopClass = '';
  @Output() isLoadingChange = new EventEmitter<boolean>();
  @Output() array = new EventEmitter<IProducts[]>();


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
      this.getProductService.getAllProducts().pipe(
        delay(1000),
      ).subscribe(products => {
        this.products = products.sort((a, b) => b.year - a.year);
        this.array.emit(this.products)
        this.isLoadingChange.emit(false);
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

  addToFavorite(event: MouseEvent) {
    const heartIcon = event.target as HTMLElement;

    if (heartIcon.classList.contains('heart-icon--active')) {
      heartIcon.classList.remove('heart-icon--active');
    } else {
      heartIcon.classList.add('heart-icon--active');
    }
  }
}

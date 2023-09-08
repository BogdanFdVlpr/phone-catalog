import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {GetProductService} from "../../services/get-product.service";
import {IProducts} from "../../models/product";
import {delay} from "rxjs";
import {DataStateService} from "../../services/data-state-service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, OnChanges {
  @Input() title!: string;
  @Input() oldPrice?: boolean;
  @Input() sortProduct?: string;
  @Input() buttonScroll?: boolean;
  @Input() flexWrap?: boolean;
  @Input() findGoods?: string;
  @Input() marginTopClass = '';
  @Output() isLoadingChange = new EventEmitter<boolean>();
  @Output() array = new EventEmitter<IProducts[]>();

  textFilter!: string;
  products: IProducts[] = [];

  constructor(
    public dataStateService: DataStateService,
    private elementRef: ElementRef,

  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.textFilter)
    }

  ngOnInit(): void {
    if (this.sortProduct) {
      this.dataStateService.phones$.subscribe(products => {
        this.products = this.sortProducts(products);
      })
    } else {
      this.dataStateService.phones$.pipe(
        delay(1000),
      ).subscribe(products => {
        this.products = products.sort((a, b) => b.year - a.year);
        this.array.emit(this.products)
        this.isLoadingChange.emit(false);
      });
    }
    this.dataStateService.searchValue$.subscribe(newTextFilter => this.textFilter = newTextFilter)
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

import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IProducts} from "../../models/product";
import {delay} from "rxjs";
import {DataStateService} from "../../services/data-state-service";
import {HandlingInputValueService} from "../../services/handling-input-value.service";
import {ProductSearchService} from "../../services/product-search.service";
import {GetSortingValueService} from "../../services/get-sorting-value.service";

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
    public handlingInputValueService: HandlingInputValueService,
    private elementRef: ElementRef,
    private productSearchService: ProductSearchService,
    private getSortingValueService: GetSortingValueService,
  ) {
  }

  ngOnInit(): void {
    this.loadData();

    this.getSortingValueService.selectedValue$.subscribe(newSelectedValue => {
      this.loadData();
    });
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sortProduct && !changes.sortProduct.firstChange ) {
      // Sort products when sortProduct changes
      this.loadData();
    }
  }

  private loadData() {
    this.getSortingValueService.selectedValue$.subscribe(newSelectedValue => {
      if (this.sortProduct) {
        this.dataStateService.phones$.subscribe(products => {
          this.products = this.sortProducts(products);
        });
      } else {
        this.dataStateService.phones$.pipe(
          delay(1000),
        ).subscribe(products => {
          if (newSelectedValue === 'name') {
            this.products = products.sort((a, b) => a.name.localeCompare(b.name));
          } else if (newSelectedValue === 'price') {
            this.products = products.sort((a, b) => a.price - b.price);
          } else {
            this.products = products.sort((a, b) => b.year - a.year);
          }
          this.isLoadingChange.emit(false);
        });
      }
    });
  }


  checkFoundProducts() {
    let filteredProducts = this.products.filter(product => {
        return  product.name.toLowerCase().includes(this.textFilter.toLowerCase())
      }
    );
    if (this.textFilter.length > 0 && filteredProducts.length === 0) {
      this.productSearchService.setFoundProducts(true);
    } else {
      this.productSearchService.setFoundProducts(false);
    }
  }

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

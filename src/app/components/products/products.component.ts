import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { IProducts } from "../../models/product";
import { DataStateService } from "../../services/data-state-service";
import { HandlingInputValueService } from "../../services/handling-input-value.service";
import { ProductSearchService } from "../../services/product-search.service";
import { GetSortingValueService } from "../../services/get-sorting-value.service";
import { ChooseItemsOnPageService } from "../../services/chooseItemsOnPage.service";
import { FavouriteBadgeService } from "../../services/favourite-badge.service";
import {FavoriteGoodsService} from "../../services/favorite-goods.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, OnChanges {
  @Input() title!: string;
  @Input() oldPrice?: boolean;
  @Input() sortProduct?: string;
  @Input() favoriteProduct?: string;
  @Input() buttonScroll?: boolean;
  @Input() flexWrap?: boolean;
  @Input() findGoods?: string;
  @Input() marginTopClass = '';
  @Output() isLoadingChange = new EventEmitter<boolean>();
  @Output() array = new EventEmitter<IProducts[]>();
  @ViewChild('paginationControls') paginationControls!: ElementRef;

  textFilter!: string;
  products: IProducts[] = [];
  favoriteProducts: IProducts[] = [];
  currentPage: number = 1;

  constructor(
      public dataStateService: DataStateService,
      public handlingInputValueService: HandlingInputValueService,
      private elementRef: ElementRef,
      private productSearchService: ProductSearchService,
      private getSortingValueService: GetSortingValueService,
      public chooseItemsOnPageService: ChooseItemsOnPageService,
      public favouriteBadgeService: FavouriteBadgeService,
      public favoriteGoodsService: FavoriteGoodsService,
  ) {
  }

  ngOnInit(): void {
    this.loadData();

    if (this.favoriteProduct) {
      this.loadFavoriteProducts();
    }

    this.handlingInputValueService.searchValue$.subscribe(newTextFilter => {
      this.textFilter = newTextFilter;
      this.checkFoundProducts();
    });

    setTimeout(() => {
      this.isLoadingChange.emit(false);
    }, 1000);


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sortProduct && !changes.sortProduct.firstChange) {
      this.loadData();
    }
  }

  loadData() {
    if (this.favoriteProduct) {
      this.loadFavoriteProducts();
    } else {
      this.getSortingValueService.selectedValue$.subscribe(newSelectedValue => {
        if (this.sortProduct) {
          this.dataStateService.phones$.subscribe(products => {
            this.products = this.sortProducts(products);
          });
        } else {
          this.dataStateService.phones$.subscribe(products => {
            if (newSelectedValue === 'name') {
              this.products = products.sort((a, b) => a.name.localeCompare(b.name));
            } else if (newSelectedValue === 'price') {
              this.products = products.sort((a, b) => a.price - b.price);
            } else {
              this.products = products.sort((a, b) => b.year - a.year);
            }
            this.currentPage = 1;
          });
        }
      });
    }
  }

  loadFavoriteProducts() {
    this.products = this.favoriteGoodsService.getFavoriteProducts();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.scrollToTop();
  }

  scrollToTop() {
    const scrollField = document.querySelector('.phones');
    if (scrollField) {
      scrollField.scrollIntoView({ behavior: 'smooth' });
    }
  }

  checkFoundProducts() {
    let filteredProducts = this.products.filter(product => {
      return product.name.toLowerCase().includes(this.textFilter.toLowerCase());
    });

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
    return products;
  }

  scrollCardsRight() {
    const cardsElement = this.elementRef.nativeElement.querySelector('.cards');
    cardsElement.scrollLeft += 289;
  }

  scrollCardsLeft() {
    const cardsElement = this.elementRef.nativeElement.querySelector('.cards');
    cardsElement.scrollLeft -= 289;
  }

  currentQuantity = this.favouriteBadgeService.favouriteBadgeSubject.value;

  addToFavorite(product: IProducts, event: MouseEvent) {
      const heartIcon = event.target as HTMLElement;

      if (heartIcon.classList.contains('heart-icon--active')) {
        heartIcon.classList.remove('heart-icon--active');
        this.favouriteBadgeService.setFavouriteBadge(this.currentQuantity -= 1);
        this.favoriteGoodsService.removeFromFavorites(product.id);
      } else {
        heartIcon.classList.add('heart-icon--active');
        this.favouriteBadgeService.setFavouriteBadge(this.currentQuantity += 1);
        this.favoriteGoodsService.addToFavorites(product, product.id);
        this.favoriteProducts.push(product)
      }
    }

}

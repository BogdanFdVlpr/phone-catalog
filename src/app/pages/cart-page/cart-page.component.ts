import {Component, OnInit} from '@angular/core';
import {ChangeVisibleHeaderService} from "../../services/change-visible-header.service";
import {RememberNavigationService} from "../../services/remember-navigation.service";
import {FavoriteGoodsService} from "../../services/favorite-goods.service";
import {IProducts} from "../../models/product";
import {CartBadgeService} from "../../services/cart-badge.service";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{
  cartPageOpen = false;
  lastVisitedPage: string = '';
  products: IProducts[] = [];
  fullPrice: number = 0;
  currentCartQuantity = this.cartBadgeService.cartBadgeSubject.value;
  constructor(
    private changeVisibleHeaderService: ChangeVisibleHeaderService,
    private rememberNavigationService: RememberNavigationService,
    private favoriteGoodsService: FavoriteGoodsService,
    private cartBadgeService: CartBadgeService,
  ) {
    this.lastVisitedPage = this.rememberNavigationService.getLastVisitedPage();
  }
    ngOnInit(): void {
        this.loadCartProducts()
        this.changeVisibleHeaderService.visibleHeader$.subscribe(status => this.cartPageOpen = status);
        this.fullPrice = this.products.reduce((sum, product) => sum + product.price, 0);
    }

  loadCartProducts() {
    this.products = this.favoriteGoodsService.getCartProductsArray();
  }

  clearCartPageOpen() {
    this.changeVisibleHeaderService.setVisibleHeader(false)
  }

  deletePhoneFromCart(product: IProducts, event: MouseEvent) {
    const click = event.target as HTMLElement

    if (click.classList.contains('cart-phone-clear')) {
      const indexToRemove = this.products.findIndex((favProduct) => favProduct.id === product.id);
      if (indexToRemove !== -1) {
        this.products.splice(indexToRemove, 1);
        this.fullPrice = this.products.reduce((sum, product) => sum + product.price, 0);
        this.cartBadgeService.setCartBadge(this.currentCartQuantity -= 1);
        this.favoriteGoodsService.removeFromCartArray(product.id);
      }
    }
  }

  changeQuantityGoods(product: IProducts, event: MouseEvent) {
    const click = event.target as HTMLElement;

    console.log(click)
  }


}

import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
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
  quantities = new Map<number, number>();
  constructor(
    private changeVisibleHeaderService: ChangeVisibleHeaderService,
    private rememberNavigationService: RememberNavigationService,
    private favoriteGoodsService: FavoriteGoodsService,
    private cartBadgeService: CartBadgeService,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    this.lastVisitedPage = this.rememberNavigationService.getLastVisitedPage();
  }
    ngOnInit(): void {
        this.loadCartProducts()
        this.changeVisibleHeaderService.visibleHeader$.subscribe(status => this.cartPageOpen = status);
        this.fullPrice = this.products.reduce((sum, product) => sum + product.price, 0);
        this.products.forEach(product => {
          this.quantities.set(product.id, 1);
        });
    }

  updateQuantity(product: IProducts, increment: boolean) {
    let currentQuantity: number = this.quantities.get(product.id) as number;
    if (currentQuantity !== undefined) {
      if (increment) {
        this.quantities.set(product.id, currentQuantity + 1);
        product.price += product.fullPrice;
      } else {
        if (currentQuantity > 1) {
          this.quantities.set(product.id, currentQuantity - 1);
          product.price -= product.fullPrice;
        }
      }
      this.updateCartTotal();
    }
  }

  updateCartTotal() {
    this.fullPrice = this.products.reduce((total, product) => total + product.price, 0);
  }

  checkCartTotalAmount(product: IProducts) {
    return this.quantities.get(product.id)! <= 1;
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

  checkoutFeature() {
    const checkout = this.el.nativeElement.querySelector('.checkout');
    this.renderer.removeClass(checkout,'checkout--hidden');
    setTimeout(() => {
      if (checkout) {
        this.renderer.addClass(checkout, 'checkout--hidden');
      }
    }, 5000);
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from "../../services/product-details.service";
import {IProducts} from "../../models/product";
import {GetProductService} from "../../services/get-product.service";
import {FavoriteGoodsService} from "../../services/favorite-goods.service";
import {FavouriteBadgeService} from "../../services/favourite-badge.service";
import {CartBadgeService} from "../../services/cart-badge.service";

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {
  productDetails!: IProducts;
  productDetailInfo: any


  constructor(
    private productDetailsService: ProductDetailsService,
    private getProductService: GetProductService,
    public favouriteBadgeService: FavouriteBadgeService,
    public favoriteGoodsService: FavoriteGoodsService,
    private cartBadgeService: CartBadgeService,
  ) {
  }

  ngOnInit(): void {
    this.productDetailsService.productDetails$.subscribe((product: IProducts) => {
      if (product) {
        this.productDetails = product;
      }
    });
    if (this.productDetails.itemId) {
      this.getProductService.getDetailsAboutProduct(this.productDetails.itemId).subscribe(detail => this.productDetailInfo = detail)
    }

  }

  getRandomID() {
    return '0' + this.productDetails.id * 1234
  }

  currentFavoriteQuantity = this.favouriteBadgeService.favouriteBadgeSubject.value;
  currentCartQuantity = this.cartBadgeService.cartBadgeSubject.value;

  addToFavorite(product: IProducts, event: MouseEvent) {
    const heartIcon = event.target as HTMLElement;

    if (heartIcon.classList.contains('heart-icon--active')) {
      heartIcon.classList.remove('heart-icon--active');
      this.favouriteBadgeService.setFavouriteBadge(this.currentFavoriteQuantity -= 1);
      this.favoriteGoodsService.removeFromFavorites(product.id);
    } else {
      heartIcon.classList.add('heart-icon--active');
      this.favouriteBadgeService.setFavouriteBadge(this.currentFavoriteQuantity += 1);
      this.favoriteGoodsService.addToFavorites(product, product.id);
    }
  }

  addToCart(product: IProducts, event: MouseEvent) {
    const addToCartButton = event.target as HTMLElement;

    if (addToCartButton.classList.contains('card-button-add--active')) {
      addToCartButton.classList.remove('card-button-add--active');
      this.cartBadgeService.setCartBadge(this.currentCartQuantity -= 1)
      this.favoriteGoodsService.removeFromCartArray(product.id)
    } else {
      addToCartButton.classList.add('card-button-add--active')
      this.cartBadgeService.setCartBadge(this.currentCartQuantity += 1)
      this.favoriteGoodsService.addToCartArray(product, product.id)
    }
  }

  chooseImg(event: MouseEvent) {
    const choosedImg = event.target as HTMLElement;
    let choosedImgUrl = choosedImg.getAttribute('src')
    let mainImg = document.querySelector('.product-details__images-main')
    if (mainImg && choosedImgUrl) {
      mainImg.setAttribute('src', choosedImgUrl)
    }
  }

  getColor(circleColor: string): string {
    switch (circleColor) {
      case 'green':
        return '#364935';
      case 'yellow':
        return '#FFE983';
        case 'gold':
        return '#F9E5C9';
        case 'red':
        return '#A50011';
        case 'midnight':
        return '#171E27';
        case 'blue':
        return '#215E7C';
        case 'pink':
        return '#FAE0D8';
        case 'graphite':
        return '#4C4A46';
        case 'silver':
        return '#F1F2ED';
        case 'spacegray':
        return '#535150';
        case 'purple':
        return '#D1CDDA';
        case 'pacificblue':
        return '#2E4755';
        case 'white':
        return '#FBF7F4';
        case 'purpule':
        return '#FBF7F4';
        case 'rosegold':
        return '#FAD7BD';
      default:
        return '#000000';
    }
  }

  protected readonly event = event;
}

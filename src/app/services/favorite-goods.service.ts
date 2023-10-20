import { Injectable } from '@angular/core';
import {IProducts} from "../models/product";

@Injectable({
  providedIn: 'root',
})
export class FavoriteGoodsService {
  private favoriteProducts: Set<number> = new Set();
  private cartProducts: Set<number> = new Set();
  private favoriteArrayGoods: IProducts[] = [];
  private cartArrayGoods: IProducts[] = [];

  addToFavorites(product: IProducts, productId: number) {
    this.favoriteProducts.add(productId);
    this.favoriteArrayGoods.push(product)
  }

  addToCartArray(product: IProducts, productId: number) {
    this.cartProducts.add(productId);
    this.cartArrayGoods.push(product)
  }

  removeFromFavorites(productId: number) {
    if (this.favoriteProducts.has(productId)) {
      this.favoriteProducts.delete(productId);

      const indexToRemove = this.favoriteArrayGoods.findIndex((favProduct) => favProduct.id === productId);
      if (indexToRemove !== -1) {
        this.favoriteArrayGoods.splice(indexToRemove, 1); // Remove the product from the array
      }
    }
  }

  removeFromCartArray(productId: number) {
    if (this.cartProducts.has(productId)) {
      this.cartProducts.delete(productId);

      const indexToRemove = this.cartArrayGoods.findIndex((cartProduct) => cartProduct.id === productId);
      if (indexToRemove !== -1) {
        this.cartArrayGoods.splice(indexToRemove, 1); // Remove the product from the array
      }
    }
  }

  isFavorite(productId: number): boolean {
    return this.favoriteProducts.has(productId);
  }

  isAddedToCart(productId: number): boolean {
    return this.cartProducts.has(productId);
  }

  getFavoriteProducts(): IProducts[] {
    return this.favoriteArrayGoods;
  }

  getCartProductsArray(): IProducts[] {
    return this.cartArrayGoods;
  }
}

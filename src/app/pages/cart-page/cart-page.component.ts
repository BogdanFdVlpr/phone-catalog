import {Component, OnInit} from '@angular/core';
import {ChangeVisibleHeaderService} from "../../services/change-visible-header.service";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{
  cartPageOpen = false;
  constructor(
    private changeVisibleHeaderService: ChangeVisibleHeaderService,
  ) {}
    ngOnInit(): void {
        this.changeVisibleHeaderService.visibleHeader$.subscribe(status => this.cartPageOpen = status)
    }

  clearCartPageOpen() {
    this.changeVisibleHeaderService.setVisibleHeader(false)
  }

}

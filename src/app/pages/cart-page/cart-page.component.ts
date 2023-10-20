import {Component, OnInit} from '@angular/core';
import {ChangeVisibleHeaderService} from "../../services/change-visible-header.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RememberNavigationService} from "../../services/remember-navigation.service";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{
  cartPageOpen = false;
  lastVisitedPage: string = '';
  constructor(
    private changeVisibleHeaderService: ChangeVisibleHeaderService,
    private route: ActivatedRoute,
    private router: Router,
    private rememberNavigationService: RememberNavigationService,
  ) {
    this.lastVisitedPage = this.rememberNavigationService.getLastVisitedPage();
  }
    ngOnInit(): void {
        this.changeVisibleHeaderService.visibleHeader$.subscribe(status => this.cartPageOpen = status);

    }

  clearCartPageOpen() {
    this.changeVisibleHeaderService.setVisibleHeader(false)
    // this.router.navigateByUrl(this.lastVisitedPage);
  }

}

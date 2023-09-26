import {Component, OnInit} from '@angular/core';
import {GetTitleUrlService} from "../../services/getTitleUrl.service";
import {HandlingInputValueService} from "../../services/handling-input-value.service";
import {FavouriteBadgeService} from "../../services/favourite-badge.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartPageOpen = false;
  inputSearch: boolean = false;
  linkTitle?: string[];
  inputText:string = '';
  favoriteBadge!: number;


  constructor(
    private getTitleUrlService: GetTitleUrlService,
    private handlingInputValueService: HandlingInputValueService,
    private favouriteBadgeService: FavouriteBadgeService,
  ) {}

  ngOnInit(): void {
    this.getTitleUrlService.headerLink$.subscribe((linkTitle) => {
      this.linkTitle = linkTitle;
      this.handleLinkTitleChange();
    });
    this.favouriteBadgeService.favouriteBadge$.subscribe(quantity => this.favoriteBadge = quantity)
  }

  showFavoriteBadge() {
    if (this.favoriteBadge > 0) {
      return true;
    } else {
      return false
    }
  }

  changeInputText() {
    this.handlingInputValueService.onSearchValueChange(this.inputText)
  }

  handleLinkTitleChange() {
    if (this.linkTitle && this.linkTitle.length > 0) {
      if (['phones', 'tablets', 'accessories', 'favorites'].includes(this.linkTitle[0])) {
        this.inputSearch = true;
      } else {
        this.inputSearch = false;
      }
    }
  }

  activateCartPageOpen() {
    this.cartPageOpen = true;
  }

  clearCartPageOpen() {
    this.cartPageOpen = false;
  }
}

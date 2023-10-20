import {Component, OnInit} from '@angular/core';
import {ProductSearchService} from "../../services/product-search.service";
import {FavouriteBadgeService} from "../../services/favourite-badge.service";
import {PaginationAccessService} from "../../services/pagination-access.service";

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit{
  favoriteBadge!: number;
  constructor(
    public productSearchService: ProductSearchService,
    public favouriteBadgeService: FavouriteBadgeService,
    private paginationAccessService: PaginationAccessService,
  ) {
  }

  ngOnInit(): void {
    this.favouriteBadgeService.favouriteBadge$.subscribe(quantity => this.favoriteBadge = quantity)
    this.paginationAccessService.setPaginationAccess(false);
  }
}

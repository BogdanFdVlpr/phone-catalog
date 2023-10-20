import {Component, OnInit} from '@angular/core';
import {PaginationAccessService} from "../../services/pagination-access.service";

@Component({
  selector: 'app-tablets-page',
  templateUrl: './tablets-page.component.html',
  styleUrls: ['./tablets-page.component.scss']
})
export class TabletsPageComponent implements OnInit{
  constructor(
    private paginationAccessService: PaginationAccessService,
  ) {}
  ngOnInit(): void {
    this.paginationAccessService.setPaginationAccess(false);
  }
  // isLoading: boolean = true;
}

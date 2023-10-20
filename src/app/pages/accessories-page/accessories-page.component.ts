import {Component, OnInit} from '@angular/core';
import {PaginationAccessService} from "../../services/pagination-access.service";

@Component({
  selector: 'app-accessories-page',
  templateUrl: './accessories-page.component.html',
  styleUrls: ['./accessories-page.component.scss']
})
export class AccessoriesPageComponent implements OnInit{
  constructor(
    private paginationAccessService: PaginationAccessService,
  ) {}

  ngOnInit(): void {
    this.paginationAccessService.setPaginationAccess(false);
  }

}

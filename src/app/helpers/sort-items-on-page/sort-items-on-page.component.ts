import {Component, Input, OnInit, Output} from '@angular/core';
import {IProducts} from "../../models/product";
import {GetSortingValueService} from "../../services/get-sorting-value.service";
import {DataStateService} from "../../services/data-state-service";

@Component({
  selector: 'app-sort-items-on-page',
  templateUrl: './sort-items-on-page.component.html',
  styleUrls: ['./sort-items-on-page.component.scss']
})
export class SortItemsOnPageComponent implements OnInit{

  selectedValues: string = '';
  allPhones: IProducts[] = [];
  constructor(
    private getSortingValueService: GetSortingValueService,
    public dataStateService: DataStateService,
  ) {
  }
  ngOnInit() {
    this.getSortingValueService.selectedValue$.subscribe((newValue) => {
      this.selectedValues = newValue;
    });
    this.dataStateService.phones$.subscribe(phones => this.allPhones = phones)
  }

  onSelectionChange(event: Event): void {
    const newValue = (event.target as HTMLSelectElement).value;
    this.getSortingValueService.updateSelectedValue(newValue);
  }

  //
  //
  // getPaginationList(pageEvent: any) {
  //   let postPerPage = +pageEvent.pageSize;
  //   let pageNumber = +pageEvent.pageIndex + 1;
  //
  //   const startIndex = postPerPage * pageNumber - postPerPage;
  //   const endIndex = Math.min(startIndex + postPerPage, this.array!.length);
  //
  //   return this.array!.slice(startIndex, endIndex);
  // }
}

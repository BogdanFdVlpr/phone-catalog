import {Component, Input, OnInit, Output} from '@angular/core';
import {IProducts} from "../../models/product";
import {GetSortingValueService} from "../../services/get-sorting-value.service";

@Component({
  selector: 'app-sort-items-on-page',
  templateUrl: './sort-items-on-page.component.html',
  styleUrls: ['./sort-items-on-page.component.scss']
})
export class SortItemsOnPageComponent implements OnInit{
  @Input() array?: IProducts[];
  // @Output() sortedArray?: IProducts[];

  selectedValues: string = '';
  constructor(
    private getSortingValueService: GetSortingValueService,
  ) {
  }
  ngOnInit() {
    this.getSortingValueService.selectedValue$.subscribe((newValue) => {
      this.selectedValues = newValue;
    });
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
  //
  // protected readonly event = event;
}

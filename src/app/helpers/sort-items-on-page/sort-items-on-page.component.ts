import {Component, Input, OnInit, Output} from '@angular/core';
import {IProducts} from "../../models/product";

@Component({
  selector: 'app-sort-items-on-page',
  templateUrl: './sort-items-on-page.component.html',
  styleUrls: ['./sort-items-on-page.component.scss']
})
export class SortItemsOnPageComponent implements OnInit{
  @Input() array?: IProducts[];
  @Output() sortedArray?: IProducts[];

  sortingValue = ''

  constructor() {
  }
  ngOnInit(): void {
  }

  sortArray(event: any) {
    this.sortingValue = event.target.value;
    // console.log(this.pageSize)
    if (this.sortingValue === 'age') {
      return this.sortedArray = this.array?.sort((a, b) => b.year - a.year)
    } else if (this.sortingValue === 'name') {
      return this.sortedArray = this.array?.sort((a, b) => (a.name.localeCompare(b.name)))
    }  else if (this.sortingValue === 'price') {
      return this.sortedArray = this.array?.sort((a, b) => a.price - b.price)
    } else {
      return this.array
    }
  }
}

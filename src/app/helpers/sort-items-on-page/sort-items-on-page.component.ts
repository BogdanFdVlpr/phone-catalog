import {Component, OnInit,} from '@angular/core';
import {IProducts} from "../../models/product";
import {GetSortingValueService} from "../../services/get-sorting-value.service";
import {DataStateService} from "../../services/data-state-service";
import {ChooseItemsOnPageService} from "../../services/chooseItemsOnPage.service";

@Component({
  selector: 'app-sort-items-on-page',
  templateUrl: './sort-items-on-page.component.html',
  styleUrls: ['./sort-items-on-page.component.scss']
})
export class SortItemsOnPageComponent implements OnInit{

  selectedValues: string = '';
  allPhones: IProducts[] = [];
  currentItemsOnPage: number = 16;
  constructor(
    private getSortingValueService: GetSortingValueService,
    public dataStateService: DataStateService,
    public chooseItemsOnPageService: ChooseItemsOnPageService,
  ) {
  }
  ngOnInit() {
    this.dataStateService.phones$.subscribe(phones => this.allPhones = phones)
    this.getSortingValueService.selectedValue$.subscribe(newValue => this.selectedValues = newValue);
    this.chooseItemsOnPageService.currentPage$.subscribe(newValue => this.currentItemsOnPage = newValue);
  }

  onSelectionChange(event: Event): void {
    const newValue = (event.target as HTMLSelectElement).value;
    this.getSortingValueService.updateSelectedValue(newValue);
  }

  onCurrentItemsChange(event: Event): void {
    const newValue = (event.target as HTMLSelectElement).value;
    this.chooseItemsOnPageService.setCurrentPage(+newValue);
  }
}

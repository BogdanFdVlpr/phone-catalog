import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GetTitleUrlService} from "../../services/getTitleUrl.service";
import {DataStateService} from "../../services/data-state-service";

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


  constructor(
    private getTitleUrlService: GetTitleUrlService,
    private dataStateService: DataStateService,
  ) {}

  ngOnInit(): void {
    this.getTitleUrlService.headerLink$.subscribe((linkTitle) => {
      this.linkTitle = linkTitle;
      this.handleLinkTitleChange();
    });
  }

  changeInputText() {
    this.dataStateService.onSearchValueChange(this.inputText)
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

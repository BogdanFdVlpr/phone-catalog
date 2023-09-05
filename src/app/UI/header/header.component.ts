import {Component, Input, OnChanges, OnInit, Output} from '@angular/core';
import {GetTitleUrlService} from "../../services/getTitleUrl.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  cartPageOpen = false;
  inputSearch: boolean = false;
  @Output() inputText: string = '';
  linkTitle?: string[]

  constructor(
    private getTitleUrlService: GetTitleUrlService,
  ) {

  }

  ngOnInit(): void {
    this.getTitleUrlService.headerLink$.subscribe((linkTitle) => {
      this.linkTitle = linkTitle;
      this.handleLinkTitleChange();
    });
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

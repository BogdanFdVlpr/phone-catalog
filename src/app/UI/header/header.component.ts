import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {GetTitleUrlService} from "../../services/getTitleUrl.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  cartPageOpen = false;
  inputSearch: boolean = false;
  linkTitle?: string[]
  @Output() inputTextChange = new EventEmitter<string>();
  constructor(
    private getTitleUrlService: GetTitleUrlService,
  ) {}

  set inputText(value: string) {
    this._inputText = value;
    this.inputTextChange.emit(value);
  }
  get inputText(): string {
    return this._inputText;
  }
  private _inputText: string = '';

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

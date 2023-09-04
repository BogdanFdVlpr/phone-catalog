import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {

  @Input() linkTitle: string[] = []
  cartPageOpen = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.linkTitle) {
      this.linkTitle = changes.linkTitle.currentValue;
    }
  }

  activateCartPageOpen() {
    this.cartPageOpen = true;
  }

  clearCartPageOpen() {
    this.cartPageOpen = false;
  }
}

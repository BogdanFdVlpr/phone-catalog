import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartPageOpen = false;

  activateCartPageOpen() {
    this.cartPageOpen = true;
  }


  clearCartPageOpen() {
    this.cartPageOpen = false;
  }
}

import {Component} from '@angular/core';

@Component({
  selector: 'app-small-navigation',
  templateUrl: './small-navigation.component.html',
  styleUrls: ['./small-navigation.component.scss']
})
export class SmallNavigationComponent{

  constructor() {}

  headerLink = window.location.href.split('/', ).splice(3, 4)
}

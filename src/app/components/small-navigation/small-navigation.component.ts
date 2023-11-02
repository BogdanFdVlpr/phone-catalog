import {Component, OnInit} from '@angular/core';
import {GetTitleUrlService} from "../../services/getTitleUrl.service";

@Component({
  selector: 'app-small-navigation',
  templateUrl: './small-navigation.component.html',
  styleUrls: ['./small-navigation.component.scss']
})
export class SmallNavigationComponent implements OnInit{

  linkTitle?: string[];
  productTitle = '';

  constructor(
    private getTitleUrlService: GetTitleUrlService,
  ) {}

  ngOnInit(): void {
    this.getTitleUrlService.headerLink$.subscribe((linkTitle) => {
      if (linkTitle.length < 2) {
        this.linkTitle = linkTitle
      } else {
        this.productTitle = linkTitle.slice(-1).join(' ').replace(/[:-]/g, ' ');
      }
    })
    }
}

import {Component, Input, OnInit, Output} from '@angular/core';
import {GetTitleUrlService} from "../../services/getTitleUrl.service";

@Component({
  selector: 'app-small-navigation',
  templateUrl: './small-navigation.component.html',
  styleUrls: ['./small-navigation.component.scss']
})
export class SmallNavigationComponent implements OnInit{

  linkTitle?: string[]

  constructor(
    private getTitleUrlService: GetTitleUrlService,
  ) {}

  ngOnInit(): void {
    this.getTitleUrlService.headerLink$.subscribe((linkTitle) => this.linkTitle = linkTitle)
    }
}

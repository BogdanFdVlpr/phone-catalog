import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {GetTitleUrlService} from "./services/getTitleUrl.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'phone-catalog';
  headerLink: string[] = [];
  constructor(
    private router: Router,
    private getTitleUrlService: GetTitleUrlService,
    ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.headerLink = window.location.href.split('/').splice(3, 4);
        this.getTitleUrlService.updateHeaderLink(this.headerLink)
      }
    });
    document.addEventListener('touchstart', function(e) {
      e.preventDefault();
    });
  }
}

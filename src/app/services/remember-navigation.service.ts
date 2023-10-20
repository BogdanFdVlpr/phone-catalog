import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RememberNavigationService {
  lastVisitedPage: string = '';

  setLastVisitedPage(page: string) {
    this.lastVisitedPage = page;
  }

  getLastVisitedPage(): string {
    return this.lastVisitedPage;
  }
}

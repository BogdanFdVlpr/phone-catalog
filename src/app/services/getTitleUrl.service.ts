import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetTitleUrlService {
  private headerLinkSource = new BehaviorSubject<string[]>([]);
  headerLink$ = this.headerLinkSource.asObservable();

  updateHeaderLink(linkTitle: string[]) {
    this.headerLinkSource.next(linkTitle);
  }
}

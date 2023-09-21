import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChooseItemsOnPageService {

  constructor() { }

  private currentPageSubject = new BehaviorSubject<number>(16);
  currentPage$ = this.currentPageSubject.asObservable();

  setCurrentPage(page: number) {
    this.currentPageSubject.next(page);
  }
}

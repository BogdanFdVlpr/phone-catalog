import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HandlingInputValueService {
  searchValue$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  constructor() { }

  onSearchValueChange(inputValue: string) {
    this.searchValue$.next(inputValue)
  }
}

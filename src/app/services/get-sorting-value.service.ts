import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetSortingValueService {

  private selectedValueSubject: BehaviorSubject<string> = new BehaviorSubject<string>('age');
  selectedValue$: Observable<string> = this.selectedValueSubject.asObservable();

  updateSelectedValue(newValue: string): void {
    this.selectedValueSubject.next(newValue);
  }
}

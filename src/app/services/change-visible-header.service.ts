import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChangeVisibleHeaderService {
  visibleHeaderSubject = new BehaviorSubject(false)

  visibleHeader$ = this.visibleHeaderSubject.asObservable()

  setVisibleHeader(status: boolean) {
    this.visibleHeaderSubject.next(status)
  }

}

import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaginationAccessService {
  paginationAccessSubject = new BehaviorSubject<boolean>(false)
  paginationAccess$ = this.paginationAccessSubject.asObservable()

  setPaginationAccess(access: boolean) {
    this.paginationAccessSubject.next(access)
  }
}

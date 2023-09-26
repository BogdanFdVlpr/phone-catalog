import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteBadgeService {
  favouriteBadgeSubject = new BehaviorSubject<number>(0);

  favouriteBadge$ = this.favouriteBadgeSubject.asObservable();

  setFavouriteBadge(quantity: number) {
    this.favouriteBadgeSubject.next(quantity);
  }
}

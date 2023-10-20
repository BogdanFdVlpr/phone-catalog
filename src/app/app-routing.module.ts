import { NgModule } from '@angular/core';
import {NavigationEnd, Router, RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {PhonesPageComponent} from "./pages/phones-page/phones-page.component";
import {TabletsPageComponent} from "./pages/tablets-page/tablets-page.component";
import {AccessoriesPageComponent} from "./pages/accessories-page/accessories-page.component";
import {FavoritesPageComponent} from "./pages/favorites-page/favorites-page.component";
import {CartPageComponent} from "./pages/cart-page/cart-page.component";
import {RememberNavigationService} from "./services/remember-navigation.service";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'phones', component: PhonesPageComponent},
  {path: 'tablets', component: TabletsPageComponent},
  {path: 'accessories', component: AccessoriesPageComponent},
  {path: 'favorites', component: FavoritesPageComponent},
  {path: 'cart', component: CartPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(
    private router: Router,
    private rememberNavigationService: RememberNavigationService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.rememberNavigationService.setLastVisitedPage(event.url);
      }
    });
  }
}

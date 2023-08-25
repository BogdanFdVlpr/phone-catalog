import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './UI/header/header.component';
import {NgOptimizedImage} from "@angular/common";
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './UI/footer/footer.component';
import { PictureSliderComponent } from './components/picture-slider/picture-slider.component';
import {FormsModule} from "@angular/forms";
import { ProductsComponent } from './components/products/products.component';
import {HttpClientModule} from "@angular/common/http";
import { PhonesPageComponent } from './pages/phones-page/phones-page.component';
import { TabletsPageComponent } from './pages/tablets-page/tablets-page.component';
import { AccessoriesPageComponent } from './pages/accessories-page/accessories-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './helpers/loading/loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SortItemsOnPageComponent } from './helpers/sort-items-on-page/sort-items-on-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    FooterComponent,
    PictureSliderComponent,
    ProductsComponent,
    PhonesPageComponent,
    TabletsPageComponent,
    AccessoriesPageComponent,
    FavoritesPageComponent,
    CartPageComponent,
    LoadingComponent,
    SortItemsOnPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    NgxHmCarouselModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

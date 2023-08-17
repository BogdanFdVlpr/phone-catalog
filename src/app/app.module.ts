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
import { ProductsSliderComponent } from './components/products-slider/products-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    FooterComponent,
    PictureSliderComponent,
    ProductsSliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    NgxHmCarouselModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-picture-slider',
  templateUrl: './picture-slider.component.html',
  styleUrls: ['./picture-slider.component.scss']
})
export class PictureSliderComponent {

  images = [
    { url: 'assets/img/banner-accessories.png' },
    { url: 'assets/img/banner-phones.png' },
    { url: 'assets/img/banner-tablets.png' },
  ];

  index = 0;
  speed = 2000;
  infinite = true;
  direction = 'right';
  autoplay = true;

  constructor() { }

}

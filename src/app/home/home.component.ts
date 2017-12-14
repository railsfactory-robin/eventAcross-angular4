import { Component, OnInit } from '@angular/core';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public carouselTileItems: Array<any>;
  public carouselTile: NgxCarousel;

  constructor() { }

  ngOnInit() {
    this.carouselTileItems = [
    'assets/images/banner.jpg',
    'assets/images/banner1.jpg',
    'assets/images/banner.jpg',
    'assets/images/banner1.jpg',
    'assets/images/banner.jpg',
    'assets/images/banner1.jpg',
    'assets/images/banner.jpg',
    'assets/images/banner1.jpg'
    ];

    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 3, all: 0},
      slide: 1,
      speed: 1500,
      interval: 3000,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      loop: true,
      touch: true,
      easing: 'ease'
    }
  }

}

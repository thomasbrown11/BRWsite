import { Component } from '@angular/core';

interface CarouselItem {
  imageURL: string;
  linkUrl: string;
  text: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent {
  carousel: CarouselItem[] | null = null;
}

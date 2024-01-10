import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

interface CarouselItem {
  imageURL: string;
  linkUrl: string;
  text: string;
}

export class CarouselComponent {
  carousel: CarouselItem[] | null = null;
}

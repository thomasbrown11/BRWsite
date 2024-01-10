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

  placeholderImage: any = '../../assets/image-placeholder.png';
  currentImage: any = {};
  itemEnlarged: any; //controls single item view
  currentImageIndex: number = 0; //used to toggle via item_data.image_ids array
  isBubbleSelected: boolean = false; // handle styling on bubble selected

  imageMap: any = {}; //imageMap contains urls with keys equal to item id

  constructor () {}

  chooseImage(id: string) {
    this.currentImage = this.imageMap[id];
    console.log(`fired choseImage.. ${this.currentImage}, ${this.currentImageIndex}`)
   }

   //handles events when bubble is clicked for image selection in single view
   selectBubble(index: number): void {
    this.currentImageIndex = index; // Update the selected index
    this.isBubbleSelected = true; // Enable the class on the selected bubble
  }

}

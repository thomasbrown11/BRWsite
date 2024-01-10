import { Component, OnInit } from '@angular/core';

interface CarouselItem {
  imageUrl: string;
  linkUrl: string | null;
  text: string | null;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {


  carousel: CarouselItem[] | null = null;

  placeholderImage: string = '../../assets/image-placeholder.png';
  currentImage: string | null = null;
  currentLink : string | null = null;
  currentDescription: string | null = null;
  currentImageIndex: number = 0; //used to toggle via item_data.image_ids array
  isBubbleSelected: boolean = false; // handle styling on bubble selected

  imageMap: any = {}; //imageMap contains urls with keys equal to item id

  constructor () {}

  ngOnInit(): void {
    //populate carousel here:
    // this.carousel = [];

    //populate carousel with first item
    this.chooseCarouselItem(this.currentImageIndex);

  }

  //change carousel item based on carousel index (use currentImageIndex as arg on init)
  chooseCarouselItem(index: number) {
    //if carousel
    if (this.carousel) {
      //populate image if image present
      if (this.carousel[index].imageUrl) {
        this.currentImage = this.carousel[this.currentImageIndex].imageUrl;
      } else {
        //is this necessary? Might be better to not populate at all
        this.currentImage = this.placeholderImage;
      }

      //populate button link if present
      if (this.carousel[this.currentImageIndex].linkUrl) {
        this.currentLink = this.carousel[this.currentImageIndex].linkUrl;
      }

      //populate description if present
      if (this.carousel[this.currentImageIndex].text) {
        this.currentDescription = this.carousel[this.currentImageIndex].text;
      }
    }
  }

  //from previous component
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

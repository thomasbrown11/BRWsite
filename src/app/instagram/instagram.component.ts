import { Component, OnInit, HostListener } from '@angular/core';
import { InstagramService } from './instagram.service';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss']
})
export class InstagramComponent implements OnInit {
  images: any[] = [];
  carouselArray: any[] = [];
  //just added?
  imageEnlarged: any;

  constructor(private instagramService: InstagramService) { }

  ngOnInit() {

    // Call the Instagram service to fetch the images and update the images array
    this.instagramService.getMedia().subscribe((data: any) => {
      //this is entire json body parsed per individual post object. Parsed further into the 'media_urls' in the template
      this.images = data.data;
    });
  }

  //added to toggle image enlargement
  toggleImageEnlarged(image: any) {
    console.log('Toggle image:', image);
    if (this.imageEnlarged === image) {
      this.imageEnlarged = null;
    } else {
      this.imageEnlarged = image;
      //if the post is a carousel you need to populate this.carouselArray as below and then build out the instagram service to make invidual id calls
      //from the express get call you just made. then populte the carouselArray with the reponse media_urls instead... maybe have an array in this function
      //to simplify and then only push the media_urls? after that you'll need to handle them somehow.
      //would this be more efficient to do onInit and then you just already have the photos there? seems like it might be a slow click function
      // if (this.imageEnlarged.media_type === 'CAROUSEL_ALBUM') {
      //   this.carouselArray = this.imageEnlarged.children.data;
      //   //data array contains id: value pairs.. use the ids from each (.forEach?) to make api calls to get media_urls from each id
      //   console.log(this.carouselArray)
      // }
    }
    console.log('Image enlarged:', this.imageEnlarged);
  }

}

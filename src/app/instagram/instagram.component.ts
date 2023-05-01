import { Component, OnInit, HostListener } from '@angular/core';
import { InstagramService } from './instagram.service';

import { forkJoin } from 'rxjs';

import { CarouselImage } from './carouselProto'

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss']
})
export class InstagramComponent implements OnInit {
  images: any[] = [];
  carousels: { [key: string]: CarouselImage[] } = {};
  //just added?
  imageEnlarged: any;

  constructor(private instagramService: InstagramService) { }

  // ngOnInit() {

  //   // Call the Instagram service to fetch the images and update the images array
  //   this.instagramService.getMedia().subscribe((data: any) => {
  //     //this is entire json body parsed per individual post object. Parsed further into the 'media_urls' in the template
  //     this.images = data.data;
  //   });

  //   this.images.forEach((image) => {
  //     //if current post has a children array (indicating it's a carousel)
  //     if (image.media_type === 'CAROUSEL_ALBUM') {
  //       console.log('its an album')
  //       const mediaUrlArray: any = [];
  //       //iterate over the array of each carousel object at image.children.data
  //       //this contains id's which whould be fed to the .getMedia(id) method from service
  //       image.children.data.forEach((child: any) => {
  //         this.instagramService.getCarouselItem(child.id).subscribe((data: any) => {
  //           //push object with media_type and media_url to to array
  //           mediaUrlArray.push(data)
  //         });
  //       });
  //       //push key:value pair of post id: array of objects with children's media_type and media_urls
  //       this.carousels[image.id] = mediaUrlArray;
  //       console.log(this.carousels)
  //     }
  //   })

  // }


  ngOnInit() {
    // Call the Instagram service to fetch the images and update the images array
    this.instagramService.getMedia().subscribe((data: any) => {
      //this is entire json body parsed per individual post object. Parsed further into the 'media_urls' in the template
      this.images = data.data;

      this.images.forEach((image) => {
        //if current post has a children array (indicating it's a carousel)
        if (image.media_type === 'CAROUSEL_ALBUM') {
          console.log('its an album')
          const mediaUrlArray: any = [];

          //iterate over the array of each carousel object at image.children.data
          //this contains id's which whould be fed to the .getCarouselItem(id) method from service
          image.children.data.forEach((child: any) => {
            mediaUrlArray.push(this.instagramService.getCarouselItem(child.id));
          });

          forkJoin(mediaUrlArray).subscribe((results: any) => {
            //push key:value pair of post id: array of objects with children's media_type and media_urls
            this.carousels[image.id] = results;
            // console.log(this.carousels);
          });
        }
      });

      console.log(this.carousels)

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

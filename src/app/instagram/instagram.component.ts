import { Component, OnInit, HostListener } from '@angular/core';
import { InstagramService } from './instagram.service';

import { forkJoin } from 'rxjs';

import { CarouselImage } from './carouselProto' //won't need
import { InstagramCacheService } from './instagram-cache.service'; //still need to add a caching library so this doesn't matter for now

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
  carouselIndex: number = 0
  next: string = '';

  constructor(private instagramService: InstagramService, private instaCache: InstagramCacheService) { }

  //onInit without the caching mechanism
  ngOnInit() {
    // Call the Instagram service to fetch the images and update the images array
    this.instagramService.getMedia().subscribe((data: any) => {
      //this is entire json body parsed per individual post object. Parsed further into the 'media_urls' in the template
      this.images = data.data;
      this.next = data.paging.next;
      console.log('next', this.next)
    });
  }

  //onInit with caching
  // ngOnInit() {
  //   //time comparator
  //   const now = new Date().getTime();
  //   // Call the Instagram service to fetch the images and update the images array
  //   const cachedData = this.instaCache.get('instagramData');
  //   //testing
  //   // console.log(cachedData);
  //   //timestamp testing included (content is stale after 1 hour here)
  //   // if (cachedData && (now - cachedData.timestamp) < 3600000) {
  //   if (cachedData) {
  //     console.log(cachedData);
  //     // Use the cached data if it exists
  //     this.images = cachedData.images; //full Insta Basic Display API
  //     this.carousels = cachedData.carousels; //Full object with key=post ID value: object with array of carousel image items with media_url
  //   } else {
  //     // Fetch the data if it hasn't been cached yet
  //     this.instagramService.getMedia().subscribe((data: any) => {
  //       //full object returned from insta with all info (currently 16 count)
  //       this.images = data.data;
  //       //iterate over each post looking for carousels
  //       this.images.forEach((image) => {
  //         if (image.media_type === 'CAROUSEL_ALBUM') {
  //           //array stores object with all info for each item in carousel
  //           const mediaUrlArray: any = [];
  //           //for each item in the carousel
  //           image.children.data.forEach((child: any) => {
  //             //check if item already exists in carousel (saved as id: then the object in cache)
  //             const cachedCarouselItem = this.instaCache.get(child.id);

  //             if (cachedCarouselItem) {
  //               // Use the cached carousel item if it exists
  //               mediaUrlArray.push(cachedCarouselItem);
  //             } else {
  //               // Fetch the carousel item if it hasn't been cached yet
  //               //this instagramService method grabs query object from individual carousel item to display medai_url
  //               const carouselItemObservable = this.instagramService.getCarouselItem(child.id);
  //               mediaUrlArray.push(carouselItemObservable);

  //               carouselItemObservable.subscribe((result: any) => {
  //                 // Cache the carousel item when it's fetched
  //                 this.instaCache.set(child.id, result);
  //               });
  //             }
  //           });
  //           //places array of all post children images/videos in carousels object with id of the post's id for easy recall
  //           forkJoin(mediaUrlArray).subscribe((results: any) => {
  //             this.carousels[image.id] = results;
  //           });
  //         }
  //       });
  //       //timestamp
  //       const now = new Date()
  //       // Cache the fetched data.. the objects (entire api return and manually built carousels object) are saved in an object title 'instagramData'
  //       this.instaCache.set('instagramData', { images: this.images, carousels: this.carousels, timestamp: now.getTime() });
  //     });
  //   }
  // }

  //added to toggle image enlargement
  toggleImageEnlarged(image: any) {
    console.log('Toggle image:', image);
    console.log('carouselIndex', this.carouselIndex)
    if (this.imageEnlarged === image) {
      this.imageEnlarged = null;
    } else {
      this.carouselIndex = 0; //set back to 0 in case multiple post click throughs
      this.imageEnlarged = image;
    }
    console.log('Image enlarged:', this.imageEnlarged);
  }

  nextImage() {
    this.carouselIndex += 1;
  }

  previousImage() {
    this.carouselIndex -= 1;
  }

  loadMore() {
    if (this.next) {
      this.instagramService.getMediaByURL(this.next).subscribe((data: any) => {
        this.images.push(...data.data);
        this.next = data.paging.next;
        console.log('next', this.next);
      });
    }
  }


}

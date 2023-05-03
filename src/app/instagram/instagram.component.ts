import { Component, OnInit } from '@angular/core';
import { InstagramService } from './instagram.service';

import { InstagramCacheService } from './instagram-cache.service'; //still need to add a caching library so this doesn't matter for now

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss']
})
export class InstagramComponent implements OnInit {
  //array stores posts from api response
  images: any[] = [];
  //just added?
  imageEnlarged: any;
  //controls which carousel image is displayed via method
  carouselIndex: number = 0
  //from api request providing key to next 16 posts. Hides more post button if empty
  after: string = '';

  // Add a cachedValues object to store cached values
  cachedValues: { images: any[], after: string } = {
    images: [],
    after: ''
  };

  constructor(private instagramService: InstagramService, private instaCache: InstagramCacheService) { }

  //onInit without the caching mechanism
  // ngOnInit() {
  //   // Call the Instagram service to fetch the images and update the images array
  //   this.instagramService.getMedia().subscribe((data: any) => {
  //     //this is entire json body parsed per individual post object. Parsed further into the 'media_urls' in the template
  //     this.images = data.data;
  //     this.after = data.paging.cursors.after;
  //     console.log('after', this.after)
  //   });
  // }

  //with only in memory caching... basically doesn't work?
  // ngOnInit() {
  //   console.log('Cached values:', this.cachedValues);
  //   // Check if cached values exist
  //   if (this.cachedValues.images.length > 0) {
  //     // Use cached values if they exist
  //     this.images = this.cachedValues.images;
  //     this.after = this.cachedValues.after;
  //     console.log('Loaded from cache:', this.images, this.after);
  //     return
  //   } else {
  //     // Fetch new values and cache them
  //     this.instagramService.getMedia().subscribe((data: any) => {
  //       this.images = data.data;
  //       this.cachedValues.images = this.images
  //       this.after = data.paging.cursors.after;
  //       this.cachedValues.after = this.after
  //       console.log('after', this.after)
  //     })
  //   }
  // }

  //local storage caching
  ngOnInit() {
    let cachedValues = JSON.parse(sessionStorage.getItem('instagramCache') || '{}');

    if (cachedValues.images && cachedValues.images.length > 0) {
      this.images = cachedValues.images;
      this.after = cachedValues.after;
      console.log('Loaded from cache:', this.images, this.after);
      //prints size metrics in bytes (comes out to maybe 18 kilobytes out of 2 mb limit)
      const instagramCache = JSON.stringify(sessionStorage.getItem('instagramCache'));
      const sizeInBytes = new Blob([instagramCache]).size;
      console.log('Size of instagramCache:', sizeInBytes, 'bytes');
    } else {
      this.instagramService.getMedia().subscribe((data: any) => {
        this.images = data.data;
        this.after = data.paging.cursors.after;
        console.log('after', this.after);
        cachedValues.images = this.images;
        cachedValues.after = this.after;
        sessionStorage.setItem('instagramCache', JSON.stringify(cachedValues));

      });
    }
  }



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
    //if init api response included 'after' suggesting more posts exist
    if (this.after) {
      this.instagramService.getMediaByCursor(this.after).subscribe((data: any) => {
        //if response includes a 'paging' prop (there are more posts)
        if (data.paging) {
          //append images to display from response
          this.images.push(...data.data);
          //if there are less than 16 posts then no more content.. hide button
          if (data.data.length < 16) {
            this.after = '';
            return;
          }
          //set after to target next batch of posts
          this.after = data.paging.cursors.after;
          console.log('after', this.after);
        } else {
          //if !paging (request body was empty array) hide button
          this.after = '';
        }
      });
    }
  }


}


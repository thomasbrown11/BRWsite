import { Component, OnInit } from '@angular/core';
import { InstagramService } from './instagram.service';

import { CacheService } from '../cache.service';

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

  constructor(private instagramService: InstagramService, private cacheService: CacheService) { }

  //instagram api call
  requestNewPosts() {
    this.instagramService.getMedia().subscribe((data: any) => {
      this.images = data.data;
      this.after = data.paging.cursors.after;
      console.log('images', this.images, 'after', this.after);
      //cache data for next call
      this.cacheService.cacheInstagramData(data);
    });
  }

  //display and cache posts from instagram api
  ngOnInit() {
    //populate component data from cache if available
    let cachedValues = this.cacheService.getInstagramCache();

    //get and set timestamps
    const timestamp = cachedValues.timestamp;
    const now = new Date().getTime();
    //if cache has image array > 0 and time isn't expired display cache data
    if (cachedValues.images && cachedValues.images.length > 0 && now - timestamp < 3600000) {
      this.images = cachedValues.images;
      this.after = cachedValues.after;
      console.log('Loaded from cache:', this.images, this.after);
      //prints size metrics in bytes (comes out to maybe 18 kilobytes out of 2 mb limit)
      console.log('Size of instagramCache:', this.cacheService.getInstagramCacheSize(), 'bytes');
    } else {
      //if no cache or invalid request new values from instagram
      this.requestNewPosts();
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

  //suggested changes... please edit carefully
  //broken.. doesn't change to after, but reinitializes bad values
  // loadMore() {
  //   //if the stamp is expired
  //   if (this.cacheService.isInstaCacheExpired()) {
  //     //reInit the instagram call
  //     console.log('instagramCache is stale')
  //     this.instagramService.getMedia().subscribe((data: any) => {
  //       this.requestNewPosts();
  //     });
  //     //cache is still fresh
  //   } else {
  //     //if there is a valid 'after' value to page to more posts
  //     if (this.after) {
  //       //fetch next batch of posts
  //       this.instagramService.getMediaByCursor(this.after).subscribe((data: any) => {
  //         //if response includes a 'paging' prop (there are more posts)
  //         if (data.paging) {
  //           //append images to display from response
  //           this.images.push(...data.data);
  //           //if there are less than 16 posts appended then no more content.. hide button
  //           if (data.data.length < 16) {
  //             this.after = '';
  //             return;
  //           }
  //           //if 16 posts fetched likely more.. set 'after'
  //           this.after = data.paging.cursors.after;
  //           console.log('after', this.after);
  //         } else {
  //           //if !paging (request body was empty array) hide button
  //           this.after = '';
  //         }
  //       });
  //     }


  //   }
  // }


}

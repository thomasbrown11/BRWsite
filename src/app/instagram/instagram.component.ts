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

  constructor(private instagramService: InstagramService, private instaCache: InstagramCacheService) { }

  //onInit without the caching mechanism
  ngOnInit() {
    // Call the Instagram service to fetch the images and update the images array
    this.instagramService.getMedia().subscribe((data: any) => {
      //this is entire json body parsed per individual post object. Parsed further into the 'media_urls' in the template
      this.images = data.data;
      this.after = data.paging.cursors.after;
      console.log('after', this.after)
    });
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


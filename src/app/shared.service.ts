import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CacheService } from './cache.service';
import { SquareService } from './square/square.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  navIsOpen: boolean = false;

  navIconSrc = '../../assets/hamburger-menu.png';

  constructor(private cacheService: CacheService, private squareService: SquareService) { }

  toggleNavIsOpen(): void {
    this.navIsOpen = !this.navIsOpen;
    this.navIconSrc = this.navIsOpen ? '../../assets/closing-icon.png' : '../../assets/hamburger-menu.png';

    //update square cache here?
    this.squareCache();
  }

  squareCache() {
    this.squareService.getCatalogue().subscribe((data: any) => {
      let categories: any[] = [];
      let items: any[] = [];

      // Parse the JSON response and populate arrays
      data.objects.forEach((object: any) => {
      if (object.type === 'CATEGORY') {
        categories.push(object);
      } else if (object.type === 'ITEM') {
        items.push(object);
      }
    });

      console.log('categories', categories, 'items', items);
      //cache data for next call
      this.cacheService.cacheSquareData(categories, items);
    });
  }

  // //display and cache posts from instagram api
  // ngOnInit() {
  //   //populate component data from cache if available
  //   let cachedValues = this.cacheService.getInstagramCache();

  //   //get and set timestamps
  //   const timestamp = cachedValues.timestamp;
  //   const now = new Date().getTime();
  //   //if cache has image array > 0 and time isn't expired display cache data
  //   if (cachedValues.images && cachedValues.images.length > 0 && now - timestamp < 3600000) {
  //     this.images = cachedValues.images;
  //     this.after = cachedValues.after;
  //     console.log('Loaded from session cache:', this.images, this.after);
  //     //prints size metrics in bytes (comes out to maybe 18 kilobytes out of 2 mb limit)
  //     console.log('Size of session instagramCache:', this.cacheService.getInstagramCacheSize(), 'bytes');
  //   } else {
  //     //if no cache or invalid request new values from instagram
  //     this.requestNewPosts();
  //   }
  // }
}

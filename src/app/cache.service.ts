import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  //instagram caching methods
  public getInstagramCache(): any {
    const cachedValues = JSON.parse(sessionStorage.getItem('instagramCache') || '{}');
    return {
      images: cachedValues.images || [],
      after: cachedValues.after || '',
      timestamp: cachedValues.timestamp || 0
    };
  }

  public cacheInstagramData(images: any[], after: string): void {
    const cachedValues = JSON.parse(sessionStorage.getItem('instagramCache') || '{}');
    //generate current time stamp
    const now = new Date().getTime();
    //update cached timestamp to current time
    cachedValues.timestamp = now;
    if (!cachedValues.images) {
      //if no images present then initialize images and after
      cachedValues.images = images;
      cachedValues.after = after;
    } else {
      //if array present append new posts to images and update after
      cachedValues.images = cachedValues.images.concat(images);
      cachedValues.after = after;
    }
    sessionStorage.setItem('instagramCache', JSON.stringify(cachedValues));
  }

  //check cache size
  public getInstagramCacheSize(): number {
    const instagramCache = JSON.stringify(sessionStorage.getItem('instagramCache'));
    return new Blob([instagramCache]).size;
  }

  //test to see if logged timeStamp is over an hour old
  public isInstaCacheExpired() {
    const cacheValues = this.getInstagramCache();
    const timestamp = cacheValues.timestamp;
    const now = new Date().getTime();
    // const hour = 60 * 60 * 1000;
    // //returns true if data is expired .. also false if timestamp doesn't exist?
    // return now - timestamp > hour;

    const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds

    // Returns true if data is expired (older than 10 mintues) or if the timestamp doesn't exist
    return !timestamp || now - timestamp > tenMinutes;
  }


  //square caching methods
  public getSquareCache(): any {
    const cachedValues = JSON.parse(sessionStorage.getItem('squareCache') || '{}');
    return {
      categories: cachedValues.categories || [], //categories for nav bar list and future component implementing 'category_id' matching type:CATEGORY id property value
      items: cachedValues.items || [], //will eventually house array of objects with type:ITEM that house all pertinent catalogue item data
      //add more later? will need to add parameters in cacheSquareData method

      images: cachedValues.images || [],//TESTING THIS
      timestamp: cachedValues.timestamp || 0
    };
  }

  public cacheSquareData(categories: any[], items: any[]): void {
    const cachedValues = JSON.parse(sessionStorage.getItem('squareCache') || '{}');
    const now = new Date().getTime();
    cachedValues.timestamp = now;
    if (!cachedValues.categories) {
      //if no categories (or any cache data really) present then initialize categories and images
      cachedValues.categories = categories;
      cachedValues.items = items;
    }
    // else {
    //   //if cache exists then you can use this method to add items to either cached array.. may not need for now
    //   //if array present append new posts to items... is there utility to appending categories? This is from instagram method and had pagination in mind
    //   cachedValues.items = cachedValues.items.concat(items);
    //   cachedValues.categories = cachedValues.categories.concat(categories);
    // }
    sessionStorage.setItem('squareCache', JSON.stringify(cachedValues));
  }

  public cacheSquareImage(images: any): void {
    const cachedValues = JSON.parse(sessionStorage.getItem('squareCache') || '{}');
    // const now = new Date().getTime();
    // cachedValues.timestamp = now;
    if (!cachedValues.images) {
      //if no images present then initialize images
      cachedValues.images = images;
    }
    // else {
    //   //if cache exists then you can use this method to add items to either cached array.. may not need for now
    //   //if array present append new posts to items... is there utility to appending categories? This is from instagram method and had pagination in mind
    //   cachedValues.items = cachedValues.items.concat(items);
    //   cachedValues.categories = cachedValues.categories.concat(categories);
    // }
    sessionStorage.setItem('squareCache', JSON.stringify(cachedValues));
  }

  //check cache size
  public getSquareCacheSize(): number {
    const squareCache = JSON.stringify(sessionStorage.getItem('squareCache'));
    return new Blob([squareCache]).size;
  }

  //test to see if logged timeStamp is over 10 minutes old
  public isSquareCacheExpired() {
    const cacheValues = this.getSquareCache();
    const timestamp = cacheValues.timestamp;
    const now = new Date().getTime();
    const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
    // Returns true if data is expired or if the timestamp doesn't exist
    return !timestamp || now - timestamp > tenMinutes;
  }







}

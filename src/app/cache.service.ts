import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

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
    const now = new Date().getTime();
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

    // Returns true if data is expired or if the timestamp doesn't exist
    return !timestamp || now - timestamp > tenMinutes;
  }

}

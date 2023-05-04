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

  public cacheInstagramData(data: any): void {
    const now = new Date().getTime();
    const cacheData = {
      images: data.data,
      after: data.paging.cursors.after,
      timestamp: now
    };
    sessionStorage.setItem('instagramCache', JSON.stringify(cacheData));
  }

  // public cacheInstagramData(images: any[], after: string): void {
  //   const cachedValues = JSON.parse(sessionStorage.getItem('instagramCache') || '{}');
  //   const now = new Date().getTime();
  //   cachedValues.timestamp = now;
  //   if (!cachedValues.images) {
  //     //if no images present then initialize images and after
  //     cachedValues.images = images;
  //     cachedValues.after = after;
  //   } else {
  //     //if array present append new posts to images and update after
  //     cachedValues.images = cachedValues.images.concat(images);
  //     cachedValues.after = after;
  //   }
  //   sessionStorage.setItem('instagramCache', JSON.stringify(cachedValues));
  // }


  public getInstagramCacheSize(): number {
    const instagramCache = JSON.stringify(sessionStorage.getItem('instagramCache'));
    return new Blob([instagramCache]).size;
  }

  //test to see if logged timeStamp is over an hour old
  public isInstaCacheExpired() {
    const cacheValues = this.getInstagramCache();
    const timestamp = cacheValues.timestamp;
    const now = new Date().getTime();
    const hour = 60 * 60 * 1000;
    //returns true if data is expired .. also false if timestamp doesn't exist?
    return now - timestamp > hour;
  }

}

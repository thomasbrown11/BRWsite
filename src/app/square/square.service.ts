import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

import { CacheService } from '../cache.service';

@Injectable({
  providedIn: 'root'
})
export class SquareService {

  private apiUrl = 'http://localhost:3000/api/square';
  private imageUrl = 'http://localhost:3000/api/square_images';
  private stockUrl = 'http://localhost:3000/api/square_item_stock';


  constructor(private http: HttpClient, private cacheService: CacheService) { }

  getCatalogue(): Observable<any> {
    //if cache isn't expired(and therefore exists)
    if (!this.cacheService.isSquareCacheExpired()) {
      const cachedValues = this.cacheService.getSquareCache();
      if (cachedValues) {
        // Data is cached and not expired, return it
        console.log('getCatalogue values are cached')
        return new Observable(observer => {
          observer.next(cachedValues);
          observer.complete();
        });
      }
    }
    console.log('square not cached.. caching')
    // If not cached or expired, make the HTTP request and cache the response
    return this.http.get<any>(this.apiUrl).pipe(
      shareReplay(1), // Cache the most recent value and share it with subscribers
      tap(data => {
          // Separate objects into categories and items arrays
          const categories: any[] = [];
          const items: any[] = [];
          data.objects.forEach((object: any) => {
            if (object.type === 'CATEGORY') {
              categories.push(object);
            } else if (object.type === 'ITEM') {
              items.push(object);
            }
          });
        // Cache the separated data using your CacheService
        this.cacheService.cacheSquareData(categories, items);
      })
    );
  }

  // getCatalogue(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     // Check if the cache is available and not expired
  //     if (!this.cacheService.isSquareCacheExpired()) {
  //       const cachedValues = this.cacheService.getSquareCache();
  //       if (cachedValues) {
  //         // Data is cached and not expired, resolve with cached data
  //         resolve(cachedValues);
  //         return;
  //       }
  //     }
  //     console.log('square not cached.. caching');
  //     // If not cached or expired, make the HTTP request and cache the response
  //     this.http.get<any>(this.apiUrl).pipe(
  //       shareReplay(1), // Cache the most recent value and share it with subscribers
  //       tap(data => {
  //         // Separate objects into categories and items arrays
  //         const categories: any[] = [];
  //         const items: any[] = [];
  //         data.objects.forEach((object: any) => {
  //           if (object.type === 'CATEGORY') {
  //             categories.push(object);
  //           } else if (object.type === 'ITEM') {
  //             items.push(object);
  //           }
  //         });
  //         // Cache the separated data using your CacheService
  //         this.cacheService.cacheSquareData(categories, items);
  //         // Resolve with the fetched data
  //         resolve(data);
  //       })
  //     ).subscribe(); // Subscribe to trigger the HTTP request
  //   });
  // }

  getImages(): Observable<any> {
    //if cache isn't expired(and therefore exists)
    if (!this.cacheService.isSquareCacheExpired()) {
      const cachedValues = this.cacheService.getSquareCache();
      if (cachedValues.images) {
        // image data is cached and not expired, return it
        console.log('image values are cached')
        return new Observable(observer => {
          observer.next(cachedValues.images);
          observer.complete();
        });
      }
    }
    console.log('square images not cached.. caching')
    // If not cached or expired, make the HTTP request and cache the response
    return this.http.get<any>(this.imageUrl).pipe(
      shareReplay(1), // Cache the most recent value and share it with subscribers
      tap(data => {
          // Separate objects into categories and items arrays
          const images: any = {};
          data.objects.forEach((object: any) => {
            images[object.id] = object.image_data.url;
          });
        // Cache the separated data using your CacheService
        this.cacheService.cacheSquareImage(images);
      })
    );
  }

  getInventory(ids: string[]) {
    const requestData = { catalogObjectIds: ids };
    this.http.post(this.stockUrl, requestData)
    .subscribe(
      (response) => {
        // Handle the response from your Express API here
        console.log(response);
      },
      (error) => {
        // Handle any errors here
        console.error(error);
      }
    );
  }

}

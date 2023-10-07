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

  constructor(private http: HttpClient, private cacheService: CacheService) { }

  getCatalogue(): Observable<any> {
    //if cache isn't expired(and therefore exists)
    if (!this.cacheService.isSquareCacheExpired()) {
      const cachedValues = this.cacheService.getSquareCache();
      if (cachedValues) {
        // Data is cached and not expired, return it
        return new Observable(observer => {
          observer.next(cachedValues);
          observer.complete();
        });
      }
    }

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

  //testing conditions to be placed elsewehre (like app initiation function)
  // let cachedValues = this.cacheService.getSquareCache();
  //   //get and set timestamps
  //   const timestamp = cachedValues.timestamp;
  //   const now = new Date().getTime();
    //if cache has image array > 0 and time isn't expired display cache data
  // if (cachedValues.categories.length > 0 && cachedValues.items.length > 0 && now - timestamp < 3600000) {
  //   // this.images = cachedValues.images;
  //   // this.after = cachedValues.after;
  //   return
  // } else {
  //   //if no cache or invalid request new values from instagram
  //   this.squareCache();
  // }

  // //this needs to be converted to do everything locally in this file rather than external file (copied from sharedService.. no longer using)
  // squareCache() {
  //   this.squareService.getCatalogue().subscribe((data: any) => {
  //     let categories: any[] = [];
  //     let items: any[] = [];

  //     // Parse the JSON response and populate arrays
  //     data.objects.forEach((object: any) => {
  //     if (object.type === 'CATEGORY') {
  //       categories.push(object);
  //     } else if (object.type === 'ITEM') {
  //       items.push(object);
  //     }
  //   });

  //     console.log('categories', categories, 'items', items);
  //     //cache data for next call
  //     this.cacheService.cacheSquareData(categories, items);
  //   });
  // }
}

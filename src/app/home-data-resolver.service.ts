import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, finalize, switchMap, delay } from 'rxjs/operators';
import { SquareService } from './square/square.service';

@Injectable({
  providedIn: 'root',
})
export class HomeDataResolver implements Resolve<any> {
  constructor(private squareService: SquareService) {}

  // resolve(): Observable<any> {
  //   return this.squareService.getCatalogue().pipe(
  //     switchMap(() => of(null)), // Use switchMap to wait for the HTTP request
  //     catchError(() => of(null)), // Handle errors gracefully
  //     finalize(() => {
  //       // The cache is now populated or the request failed
  //     })
  //   );
  // }

  resolve(): Observable<any> {
    // Use forkJoin to combine multiple observables
    return forkJoin([
      this.squareService.getCatalogue(),
      this.squareService.getImages(),
    ]).pipe(
      // delay(3000), // Add a delay of 1 second
      switchMap(([catalogueData, imagesData]) => {
        // Process the data here if needed
        return of({ catalogueData, imagesData });
      }),
      catchError(() => of(null)), // Handle errors gracefully
      finalize(() => {
        console.log('Resolver completed... cached from resolver');// The cache is now populated or the request failed
      })
    );
  }
}

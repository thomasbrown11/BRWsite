import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { SquareService } from './square/square.service';

@Injectable({
  providedIn: 'root',
})
export class HomeDataResolver implements Resolve<any> {
  constructor(private squareService: SquareService) {}

  resolve(): Observable<any> {
    return this.squareService.getCatalogue().pipe(
      switchMap(() => of(null)), // Use switchMap to wait for the HTTP request
      catchError(() => of(null)), // Handle errors gracefully
      finalize(() => {
        // The cache is now populated or the request failed
      })
    );
  }
}

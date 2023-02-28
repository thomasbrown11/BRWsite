import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ContactPrototype } from './contactProto';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //configured api route direct to email via mailthis.to
  private api = 'https://mailthis.to/tb5a'
  private httpOptions = {
    'Content-Type': 'application/json'
  }

  //import HttpClient 
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    //clientside or network error occured
    if (error.status === 0) {
      console.error(`An error occurred:`, error.error)
    } else {
      //backend returned failure repsonse code, give more info
      console.error(`Backend returned code ${error.status}, body was `, error.error)
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  //post email to mailthis.to server api. pipe to handleError if failed
  PostMessage(input: ContactPrototype, mailAd: string, requestType: string, eMessage: string) {
    // return this.http.post<ContactPrototype>(this.api, input, this.httpOptions).pipe(
    //   catchError(this.handleError)
    // )
    //   let data = {
    //     email: mailAd,
    //     _subject: requestType,
    //     message: eMessage
    //   }
    //   this.http.post(this.api, data).pipe(
    //     function () {
    //       location.href = 'https://mailthis.to/confirm'
    //     }
    //   )
    //   // then(function () {
    //   //   location.href = 'https://mailthis.to/confirm'
    //   // });

  }

}

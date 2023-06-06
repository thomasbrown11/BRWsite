import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

//delete?
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:3000/send-email';

  constructor(private http: HttpClient) { }

  sendEmail(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      switchMap(response => {
        const fileNames = data.getAll('files');
        console.log('File names:', fileNames);
        if (fileNames.length === 0) {
          return of(response);
        }
        const deleteRequests = fileNames.map(fileName => {
          if (fileName instanceof File) {
            fileName = fileName.name; // Assign the file name to fileName variable
          }
          const url = `http://localhost:3000/uploads/${fileName}`;
          console.log('Deleting file:', fileName);
          return this.http.delete(url);
        });
        return forkJoin(deleteRequests).pipe(
          map(() => response),
          catchError(error => of(error))
        );
      }),
      catchError(error => of(error))
    );
  }

  sendNewsletterSub(email: string): Observable<any> {
    const payload = { email };
    return this.http.post<any>(`${this.apiUrl}/newsletter-sub`, payload).pipe(
      catchError(error => {
        return of(error);
      })
    );
  }

  confirmUnsubscribe(email: string, feedback: string): Observable<any> {
    const payload = { email, feedback };
    return this.http.post<any>(`${this.apiUrl}/news-unsubscribe`, payload).pipe(
      catchError(error => {
        return of(error);
      })
    );
  }


}

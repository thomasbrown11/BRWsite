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

  // sendEmail(data: FormData): Observable<any> { //you added FormData to accomodate test 'sendEmail' method written by GPT
  //   console.log(data);
  //   return this.http.post<any>(this.apiUrl, data).pipe(
  //     switchMap(response => of(response)),
  //     catchError(error => of(error))
  //   );
  // }

  // sendEmail(data: FormData): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, data).pipe(
  //     switchMap(response => {
  //       // Delete the uploaded files here
  //       const fileNames = data.getAll('file');
  //       fileNames.forEach(fileName => {
  //         console.log(fileName);
  //         return this.http.delete(`http://localhost:3000/uploads/${fileName}`);
  //       });
  //       return of(response);
  //     }),
  //     catchError(error => of(error))
  //   );
  // }

  // sendEmail(data: FormData): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, data).pipe(
  //     switchMap(response => {
  //       // Delete the uploaded files here
  //       const fileNames = data.getAll('files');
  //       console.log('File names:', fileNames);
  //       fileNames.forEach(fileName => {
  //         console.log('Deleting file:', fileName);
  //         return this.http.delete(`http://localhost:3000/uploads/${fileName}`);
  //       });
  //       return of(response);
  //     }),
  //     catchError(error => of(error))
  //   );
  // }



sendEmail(data: FormData): Observable<any> {
  return this.http.post<any>(this.apiUrl, data).pipe(
    switchMap(response => {
      const fileNames = data.getAll('files');
      console.log('File names:', fileNames);
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




}

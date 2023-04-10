import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:3000/send-email';

  constructor(private http: HttpClient) { }

  sendEmail(data: FormData): Observable<any> { //you added FormData to accomodate test 'sendEmail' method written by GPT
    return this.http.post<any>(this.apiUrl, data).pipe(
      switchMap(response => of(response)),
      catchError(error => of(error))
    );
  }
}

// uploadFile(file: File, progressListener: ImageUploadProgressListener): Promise<Image> {
//   const data = new FormData();
//   if (this.isPng(file.name)) {
//       data.append('pngimagedata', file);
//   } else {
//       data.append('imagedata', file);
//   }
//   return this.network.execute(this.buildPostRequest(data, progressListener));
// }

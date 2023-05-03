import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  private apiUrl = 'http://localhost:3000/api/instagram';

  constructor(private http: HttpClient) { }

  getMedia(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      shareReplay(1) // cache the most recent value and share it with subscribers
    );
  }

  getMediaByCursor(after: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${after}`).pipe(
      shareReplay(1) // cache the most recent value and share it with subscribers
    );
  }

  getMediaByURL(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      shareReplay(1) // cache the most recent value and share it with subscribers
    );
  }

}


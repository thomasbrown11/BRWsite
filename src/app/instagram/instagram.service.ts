import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  private apiUrl = 'http://localhost:3000/api/instagram';

  constructor(private http: HttpClient) { }

  getMedia(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  //arg is id in post object.. iterate over images (returned object from getMedia())
  getCarouselItem(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  getMediaByURL(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SquareService {

  private apiUrl = 'http://localhost:3000/api/square';

  constructor(private http: HttpClient) { }

  getCatalogue(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      shareReplay(1) // cache the most recent value and share it with subscribers
    );
  }
}

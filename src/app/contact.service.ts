import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ContactPrototype } from './contactProto';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:3000/send-email';

  constructor(private http: HttpClient) { }

  // sendEmail(name: string, email: string, message: string, subject: string): Observable<any> {
  sendEmail(data: ContactPrototype): Observable<any> {
    // const data = { name, email, message, subject }
    return this.http.post<any>(this.apiUrl, data)
  }
}

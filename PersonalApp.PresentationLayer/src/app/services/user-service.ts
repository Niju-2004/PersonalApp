import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';

// @Service()
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {

  }
  verifyUser(emailId: String, password: String): Observable<number> {
    // return this.http.get<number>('https:localhost:7228/api/User/Userverify?Email=${emailId}'&Password='${password}');
    return this.http.get<number>(`https://localhost:7228/api/User/Userverify?Email=${emailId}&Password=${password}`);
  }
}

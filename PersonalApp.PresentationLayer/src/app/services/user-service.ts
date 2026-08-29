import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private localhostWebApi = 'https://localhost:7228/api';
  private deployedWebApi = 'https://personalapp-pd9o.onrender.com/api';
  private baseWebApi = this.deployedWebApi; 

  constructor(private http: HttpClient) { }

  verifyUser(emailId: String, password: String): Observable<number> {
    return this.http.get<number>(`${this.baseWebApi}/User/Userverify?Email=${emailId}&Password=${password}`);
  }

  userInformation(emailId: String, password: String): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseWebApi}/User/UserInformation?Email=${emailId}&Password=${password}`);
  }

  userRegistration(name: string, email: string, password: string): Observable<number> {
    const user = {
      userId: 0,
      name: name,
      email: email,
      password: password,
      createdAt: new Date().toISOString()
    };
    return this.http.post<number>(`${this.baseWebApi}/User/userRegistration`, user);
  }
}


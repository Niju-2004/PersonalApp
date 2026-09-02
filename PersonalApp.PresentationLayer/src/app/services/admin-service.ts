import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdminAnalytics, IAdminUserDetail } from '../interfaces/IAdmin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private localhostWebApi = 'https://localhost:7228/api';
  private deployedWebApi = 'https://personalapp-pd9o.onrender.com/api';
  private baseWebApi = this.localhostWebApi;

  constructor(private http: HttpClient) { }

  getAnalytics(): Observable<IAdminAnalytics> {
    return this.http.get<IAdminAnalytics>(`${this.baseWebApi}/Admin/analytics`);
  }

  getAllUsers(): Observable<IAdminUserDetail[]> {
    return this.http.get<IAdminUserDetail[]>(`${this.baseWebApi}/Admin/allUsers`);
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseWebApi}/Admin/deleteUser/${userId}`);
  }
}


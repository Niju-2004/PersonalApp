import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISaving } from '../interfaces/ISaving';

@Injectable({
  providedIn: 'root'
})
export class SavingsService {
  private localhostWebApi = 'https://localhost:7228/api';
  private deployedWebApi = 'https://personalapp-pd9o.onrender.com/api';
  private baseWebApi = this.deployedWebApi;

  constructor(private http: HttpClient) { }

  getAllSavings(userId: number): Observable<ISaving[]> {
    return this.http.get<ISaving[]>(`${this.baseWebApi}/Savings/allSavings?userId=${userId}`);
  }

  addSavings(saving: ISaving): Observable<number> {
    return this.http.post<number>(`${this.baseWebApi}/Savings/addSavings`, saving);
  }

  deleteSaving(savingsId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseWebApi}/Savings/deleteSaving/${savingsId}`);
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { IJobs } from '../interfaces/IJobs';
import { Observable } from 'rxjs/internal/Observable';
import { ITask } from '../interfaces/ITask';

// @Service()
  @Injectable({
    providedIn: 'root'
})

  export class DashboardService {

    private localhostWebApi = 'https://localhost:7228/api';
    private deployedWebApi = 'https://personalapp-pd9o.onrender.com/api';
    private baseWebApi = this.deployedWebApi; 

    constructor(private http: HttpClient) {

    }

    getAllJobs(userId: number): Observable<IJobs[]> {
      return this.http.get<IJobs[]>(`${this.baseWebApi}/jobs/allJobs?UserId=${userId}`);
    }

    getAllTasks(userId: number): Observable<ITask[]> {
      return this.http.get<ITask[]>(`${this.baseWebApi}/Tasks/allTasks?userId=${userId}`);
    }
}

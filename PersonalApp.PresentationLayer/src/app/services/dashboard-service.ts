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

    constructor(private http: HttpClient) {

    }

    getAllJobs(userId: number): Observable<IJobs[]> {
      return this.http.get<IJobs[]>(`https:localhost:7228/api/jobs/allJobs?UserId=${userId}`);
    }

    getAllTasks(userId: number): Observable<ITask[]> {
      return this.http.get<ITask[]>(`https://localhost:7228/api/Tasks/allTasks?userId=${userId}`);
    }
}

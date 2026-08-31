import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { IJobs } from '../interfaces/IJobs';
import { Observable } from 'rxjs/internal/Observable';

// @Service()
@Injectable({
  providedIn: 'root'
})
export class JobService {
  private localhostWebApi = 'https://localhost:7228/api';
  private deployedWebApi = 'https://personalapp-pd9o.onrender.com/api';

  private baseWebApi = this.localhostWebApi;

  constructor(private http: HttpClient) { }

  addJobs(applicationId:number, userId:number, companyName:string, jobTitle:string,
    jobUrl: string, appliedDate: string, status: string, salary: number, interviewDate: string,
    notes: string,): Observable<number> {

    const payload = {
      applicationId: applicationId,
      userId: userId,
      companyName: companyName,
      jobTitle: jobTitle,
      jobUrl: jobUrl ? jobUrl : null,
      appliedDate: appliedDate,
      status: status,
      salary: salary ? Number(salary) : null,
      interviewDate: interviewDate && interviewDate.trim() !== '' ? interviewDate : null,
      notes: notes ? notes : null
    };

    return this.http.post<number>(`${this.baseWebApi}/jobs/addJob`, payload); 
  }

}

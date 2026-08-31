import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILearningItem, ILearningLog } from '../interfaces/ILearning';

@Injectable({
  providedIn: 'root'
})
export class LearningService {
  private localhostWebApi = 'https://localhost:7228/api';
  private deployedWebApi = 'https://personalapp-pd9o.onrender.com/api';
  private baseWebApi = this.deployedWebApi;

  constructor(private http: HttpClient) { }

  getAllSubjects(userId: number): Observable<ILearningItem[]> {
    return this.http.get<ILearningItem[]>(`${this.baseWebApi}/Learning/allSubjects?userId=${userId}`);
  }

  addSubject(item: ILearningItem): Observable<number> {
    return this.http.post<number>(`${this.baseWebApi}/Learning/addSubject`, item);
  }

  deleteSubject(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseWebApi}/Learning/deleteSubject/${id}`);
  }

  getLogsBySubject(learningItemId: number): Observable<ILearningLog[]> {
    return this.http.get<ILearningLog[]>(`${this.baseWebApi}/Learning/subjectLogs?learningItemId=${learningItemId}`);
  }

  getAllLogsForUser(userId: number): Observable<ILearningLog[]> {
    return this.http.get<ILearningLog[]>(`${this.baseWebApi}/Learning/allLogs?userId=${userId}`);
  }

  saveOrUpdateLog(log: ILearningLog): Observable<number> {
    return this.http.post<number>(`${this.baseWebApi}/Learning/saveLog`, log);
  }

  deleteLog(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseWebApi}/Learning/deleteLog/${id}`);
  }

  untickDate(learningItemId: number, date: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseWebApi}/Learning/untickDate`, { learningItemId, date });
  }
}


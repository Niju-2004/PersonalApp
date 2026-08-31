import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../interfaces/ITask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localhostWebApi = 'https://localhost:7228/api';
  private deployedWebApi = 'https://personalapp-pd9o.onrender.com/api';
  private baseWebApi = this.deployedWebApi;

  constructor(private http: HttpClient) { }

  getAllTasks(userId: number): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.baseWebApi}/Tasks/allTasks?userId=${userId}`);
  }

  addTask(task: ITask): Observable<number> {
    return this.http.post<number>(`${this.baseWebApi}/Tasks/addTask`, task);
  }

  toggleTaskStatus(taskId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseWebApi}/Tasks/toggleStatus/${taskId}`, {});
  }

  deleteTask(taskId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseWebApi}/Tasks/deleteTask/${taskId}`);
  }
}


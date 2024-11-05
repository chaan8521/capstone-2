import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AssignedScheduleModel } from '../../models/assigned-schedule.model';
import { catchError, Observable, throwError } from 'rxjs';


const headers = new HttpHeaders({
  'Content-Type': ['application/json'],
  Authorization: 'Bearer ' + localStorage.getItem('access-token')
})


const API_URL = environment.api_url;
@Injectable({
  providedIn: 'root'
})
export class AssignedScheduleService {

  constructor(private httpClient: HttpClient) { }


  
  public async createAssignedSchedule(assignedScheduleModel: AssignedScheduleModel) {
    return this.httpClient.post<AssignedScheduleModel>(`${API_URL}/api/assigned/schedule`, assignedScheduleModel,{ headers }).pipe(
      catchError(this.httpError)
    );
  }

  public async getAssignedScheduleList(): Promise<Observable<AssignedScheduleModel>> {
    const url = `${API_URL}/api/assigned/schedule`;
    return this.httpClient.get<AssignedScheduleModel>(url, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public async getAssignedScheduleByUserIdList(): Promise<Observable<AssignedScheduleModel>> {
    const url = `${API_URL}/api/assigned/schedule/student`;
    return this.httpClient.get<AssignedScheduleModel>(url, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public updateAssignedSchedule(id: number, assignedScheduleModel: AssignedScheduleModel) {
    return this.httpClient.put<AssignedScheduleModel>(`${API_URL}/api/assigned/schedule/${id}`, assignedScheduleModel, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public deleteAssignedSchedule(id: number) {
    return this.httpClient.delete<AssignedScheduleModel>(`${API_URL}/api/assigned/schedule/${id}`, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  httpError(error: HttpErrorResponse) {
    return throwError(error);
  }
}

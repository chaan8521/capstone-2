import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ScheduleModel } from '../../models/schedule.model';
import { catchError, Observable, throwError } from 'rxjs';


const headers = new HttpHeaders({
  'Content-Type': ['application/json'],
  Authorization: 'Bearer ' + localStorage.getItem('access-token')
})

const API_URL = environment.api_url;
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private httpClient: HttpClient) { }
  public async createSchedule(systemTableRequest: ScheduleModel) {
    return this.httpClient.post<ScheduleModel>(`${API_URL}/api/schedule`, systemTableRequest,{ headers }).pipe(
      catchError(this.httpError)
    );
  }

  public async getScheduleList(): Promise<Observable<ScheduleModel>> {
    const url = `${API_URL}/api/schedule`;
    return this.httpClient.get<ScheduleModel>(url, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public getSubjects():Observable<any[]>{
    const url = `${API_URL}/api/subjects`;
    return this.httpClient.get<any[]>(url,{headers}).pipe(
      catchError(this.httpError)
    );
  }

  public updateSchedule(id: number, systemTableRequest: ScheduleModel) {
    return this.httpClient.put<ScheduleModel>(`${API_URL}/api/schedule/${id}`, systemTableRequest, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public deleteSchedule(id: number) {
    return this.httpClient.delete<ScheduleModel>(`${API_URL}/api/schedule/${id}`, { headers }).pipe(
      catchError(this.httpError)
    );
  }
  httpError(error: HttpErrorResponse) {
    return throwError(error);
  }
}

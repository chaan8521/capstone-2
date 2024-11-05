import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { DepartmentModel } from '../../models/department.model';

const headers = new HttpHeaders({
  'Content-Type': ['application/json'],
  Authorization: 'Bearer ' + localStorage.getItem('access-token')
})
const API_URL = environment.api_url;
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClient: HttpClient) { }
  
  public async getDepartmentList(): Promise<Observable<DepartmentModel>> {
    const url = `${API_URL}/api/department`;
    return this.httpClient.get<DepartmentModel>(url, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public async createDepartment(departmentModel: DepartmentModel) {
    return this.httpClient.post<DepartmentModel>(`${API_URL}/api/department`, departmentModel,{ headers }).pipe(
      catchError(this.httpError)
    );
  }
  
  public updateDepartment(id: number, departmentModel: DepartmentModel) {
    return this.httpClient.put<DepartmentModel>(`${API_URL}/api/department/${id}`, departmentModel, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public deleteDepartment(id: number) {
    return this.httpClient.delete<DepartmentModel>(`${API_URL}/api/department/${id}`, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  httpError(error: HttpErrorResponse) {
    return throwError(error);
  }
}

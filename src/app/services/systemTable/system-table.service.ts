import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { SystemTableModel } from '../../models/system-table.model';
import { environment } from '../../../environments/environment';


const headers = new HttpHeaders({
  'Content-Type': ['application/json'],
  Authorization: 'Bearer ' + localStorage.getItem('access-token')
})
const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class SystemTableService {

  constructor(private httpClient:HttpClient) { }
  public async createSystemTable(systemTableRequest: SystemTableModel) {
    return this.httpClient.post<SystemTableModel>(`${API_URL}/api/system/table`, systemTableRequest,{ headers }).pipe(
      catchError(this.httpError)
    );
  }

  public async getSystemTableList(): Promise<Observable<SystemTableModel>> {
    const url = `${API_URL}/api/system/table`;
    return this.httpClient.get<SystemTableModel>(url, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public getSystemTableByCategoryList(category: string): Observable<SystemTableModel> {
    const url = `${API_URL}/api/system/table/${category}`;
    return this.httpClient.get<SystemTableModel>(url, { headers }).pipe(
      catchError(this.httpError)
    );
  }



  public updateSystemTable(id: number, systemTableRequest: SystemTableModel) {
    return this.httpClient.put<SystemTableModel>(`${API_URL}/api/system/table/${id}`, systemTableRequest, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public deleteSystemTable(id: number) {
    return this.httpClient.delete<SystemTableModel>(`${API_URL}/api/system/table/${id}`, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  httpError(error: HttpErrorResponse) {
    return throwError(error);
  }

}

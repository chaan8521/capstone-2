import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SubjectModel } from '../../models/subject.model';
import { catchError, Observable, throwError } from 'rxjs';



const headers = new HttpHeaders({
  'Content-Type': ['application/json'],
  Authorization: 'Bearer ' + localStorage.getItem('access-token')
})

const API_URL = environment.api_url;
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private httpClient: HttpClient) { }
  public async createSubject(systemTableRequest: SubjectModel) {
    return this.httpClient.post<SubjectModel>(`${API_URL}/api/subject`, systemTableRequest,{ headers }).pipe(
      catchError(this.httpError)
    );
  }

  public async getSubjectList(): Promise<Observable<SubjectModel>> {
    const url = `${API_URL}/api/subject`;
    return this.httpClient.get<SubjectModel>(url, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public updateSubject(id: number, systemTableRequest: SubjectModel) {
    return this.httpClient.put<SubjectModel>(`${API_URL}/api/subject/${id}`, systemTableRequest, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  public deleteSubject(id: number) {
    return this.httpClient.delete<SubjectModel>(`${API_URL}/api/subject/${id}`, { headers }).pipe(
      catchError(this.httpError)
    );
  }

  httpError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
